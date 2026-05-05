import type { Request, Response } from "express";
import { z } from "zod";
import { runPathDiscovery } from "../services/ai/ai-engine.js";

const onboardingSchema = z.object({
  background: z.string().min(2),
  interests: z.array(z.string().min(1)).min(1),
  goal: z.enum(["employment", "freelancing", "academic_advantage", "personal_growth"]),
  timeCommitment: z.enum(["low", "medium", "high"])
});

export async function createRecommendation(req: Request, res: Response) {
  const input = onboardingSchema.parse(req.body);
  const result = await runPathDiscovery(input);

  res.json(result);
}
