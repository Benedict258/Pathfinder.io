import type { Request, Response } from "express";
import { z } from "zod";
import { runReskillingDiscovery } from "../services/ai/ai-engine.js";

const reskillingSchema = z.object({
  currentRole: z.string().min(2),
  currentSkills: z.array(z.string().min(1)).min(1),
  targetIndustry: z.string().min(2).optional(),
});

export async function recommendReskilling(req: Request, res: Response) {
  const input = reskillingSchema.parse(req.body);
  const result = await runReskillingDiscovery(input);
  res.json(result);
}
