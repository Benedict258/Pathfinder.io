import type { Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../config/supabase.js";
import { triggerStreakEmail } from "../services/email/triggers.js";

const markCompleteSchema = z.object({
  node_id: z.string(),
});

export async function markNodeComplete(req: Request, res: Response) {
  if (!supabaseAdmin) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const { node_id } = markCompleteSchema.parse(req.body);

    const { error } = await supabaseAdmin
      .from("user_progress")
      .upsert(
        { user_id: user.id, roadmap_node_id: node_id, completed_at: new Date().toISOString() },
        { onConflict: "user_id,roadmap_node_id" }
      );

    if (error) {
      res.status(500).json({ message: "Failed to save progress" });
      return;
    }

    const { data: progress } = await supabaseAdmin
      .from("user_progress")
      .select("completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false });

    let streak = 0;
    if (progress) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let checkDate = new Date(today);

      for (const entry of progress) {
        const entryDate = new Date(entry.completed_at);
        entryDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((checkDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          continue;
        } else if (diffDays === 1) {
          streak++;
          checkDate = entryDate;
        } else {
          break;
        }
      }

      const hasToday = progress.some((p: any) => {
        const d = new Date(p.completed_at);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      });
      if (hasToday && streak === 0) streak = 1;
    }

    const streakMilestones = [3, 7, 14];
    if (streakMilestones.includes(streak) && user.email) {
      triggerStreakEmail(
        user.id,
        user.email,
        undefined,
        streak,
        progress?.length || 0,
      ).catch(() => {});
    }

    res.json({ success: true, streak });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: "Validation failed", issues: err.issues });
      return;
    }
    console.error("Progress error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

const nodeIdsSchema = z.object({
  node_ids: z.array(z.string()),
});

export async function getProgress(req: Request, res: Response) {
  if (!supabaseAdmin) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from("user_progress")
      .select("roadmap_node_id, completed_at")
      .eq("user_id", user.id);

    if (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
      return;
    }

    const completedNodeIds = (data || []).map((p: any) => p.roadmap_node_id);

    let streak = 0;
    if (data && data.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let checkDate = new Date(today);
      const sortedDates = data
        .map((p: any) => new Date(p.completed_at))
        .sort((a: Date, b: Date) => b.getTime() - a.getTime());

      for (const entryDate of sortedDates) {
        const d = new Date(entryDate);
        d.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((checkDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) continue;
        else if (diffDays === 1) { streak++; checkDate = d; }
        else break;
      }

      const hasToday = sortedDates.some((d: Date) => {
        const copy = new Date(d);
        copy.setHours(0, 0, 0, 0);
        return copy.getTime() === today.getTime();
      });
      if (hasToday && streak === 0) streak = 1;
    }

    res.json({ completedNodeIds, streak, totalCompleted: (data || []).length });
  } catch (err) {
    console.error("GetProgress error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
