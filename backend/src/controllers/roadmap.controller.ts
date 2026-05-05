import type { Request, Response } from "express";
import { roadmaps } from "../data/roadmaps.js";

export function listRoadmaps(_req: Request, res: Response) {
  res.json({ roadmaps });
}

export function getRoadmapBySlug(req: Request, res: Response) {
  const roadmap = roadmaps.find((item) => item.slug === req.params.slug);

  if (!roadmap) {
    res.status(404).json({ message: "Roadmap not found" });
    return;
  }

  res.json({ roadmap });
}
