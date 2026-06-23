import type { Request, Response } from "express";
import { opportunities } from "../data/opportunities.js";

export function listOpportunities(_req: Request, res: Response) {
  const { type } = _req.query;
  let filtered = opportunities;

  if (type && typeof type === "string") {
    filtered = opportunities.filter((o) => o.type === type);
  }

  res.json({ opportunities: filtered });
}
