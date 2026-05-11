import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  // Core
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),

  // Database (Supabase)
  SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),

  // Redis (Caching & Sessions)
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // AI Provider (Phase 1: "mock", Phase 2+: "claude")
  AI_PROVIDER: z.enum(["mock", "openai", "claude", "anthropic"]).default("mock"),
  CLAUDE_API_KEY: z.string().optional(),

  // CMS (Choose: Sanity or Notion)
  SANITY_PROJECT_ID: z.string().optional(),
  SANITY_DATASET: z.string().default("production"),
  SANITY_API_TOKEN: z.string().optional(),
  NOTION_API_KEY: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),

  // Monitoring (Error tracking + Analytics)
  SENTRY_DSN: z.string().optional(),
  POSTHOG_API_KEY: z.string().optional()
});

export const env = envSchema.parse(process.env);