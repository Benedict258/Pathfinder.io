import type { Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin, hasSupabaseConfig } from "../config/supabase.js";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(1).optional(),
});

export async function signup(req: Request, res: Response) {
  if (!supabaseAdmin) {
    res.status(503).json({ message: "Auth not configured" });
    return;
  }

  try {
    const input = signupSchema.parse(req.body);

    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: true,
    });

    if (createError || !userData.user) {
      res.status(400).json({ message: createError?.message || "Failed to create user" });
      return;
    }

    await supabaseAdmin.from("profiles").upsert({
      id: userData.user.id,
      full_name: input.full_name || null,
    });

    res.status(201).json({
      user: { id: userData.user.id, email: userData.user.email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: "Validation failed", issues: err.issues });
      return;
    }
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getMe(req: Request, res: Response) {
  if (!supabaseAdmin) {
    res.status(503).json({ message: "Auth not configured" });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("full_name, background, created_at")
      .eq("id", user.id)
      .single();

    res.json({ user: { id: user.id, email: user.email, ...profile } });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
