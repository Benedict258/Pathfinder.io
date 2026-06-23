import type { Request, Response } from "express";
import { z } from "zod";
import { runFieldStudyDiscovery } from "../services/ai/ai-engine.js";

const fieldStudySchema = z.object({
  field: z.string().min(2),
});

export async function recommendByField(req: Request, res: Response) {
  const { field } = fieldStudySchema.parse(req.body);
  const result = await runFieldStudyDiscovery(field);
  res.json(result);
}
