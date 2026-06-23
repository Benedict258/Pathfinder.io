import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import { env } from "./env.js";

export const hasSupabaseConfig = Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);

export const supabaseAdmin = hasSupabaseConfig
  ? createClient(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
      realtime: { transport: WebSocket as any }
    })
  : null;
