import type { Request, Response } from "express";
import { hasSupabaseConfig } from "../config/supabase.js";

export function getHealth(_req: Request, res: Response) {
  res.json({
    status: "ok",
    service: "pathfinder-backend",
    supabaseConfigured: hasSupabaseConfig
  });
}
