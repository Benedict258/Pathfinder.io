import type { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase.js";
import { roadmaps as inMemoryRoadmaps, type Roadmap } from "../data/roadmaps.js";

async function fetchRoadmaps(): Promise<Roadmap[] | null> {
  if (!supabaseAdmin) return null;
  try {
    const { data, error } = await supabaseAdmin
      .from("roadmaps")
      .select(`
        slug,
        title,
        description,
        level,
        roadmap_nodes (
          id,
          title,
          explanation,
          resource_title,
          resource_url,
          go_deeper
        )
      `);

    if (error || !data) return null;

    return data.map((row: any) => ({
      slug: row.slug,
      title: row.title,
      description: row.description,
      level: row.level,
      nodes: (row.roadmap_nodes || []).map((node: any) => ({
        id: String(node.id),
        title: node.title,
        explanation: node.explanation,
        resourceTitle: node.resource_title,
        resourceUrl: node.resource_url,
        goDeeper: node.go_deeper
      }))
    }));
  } catch (err) {
    console.error("Failed to query roadmaps from Supabase:", err);
    return null;
  }
}

export async function listRoadmaps(_req: Request, res: Response) {
  const dbRoadmaps = await fetchRoadmaps();
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");
  res.json({ roadmaps: dbRoadmaps ?? inMemoryRoadmaps });
}

export async function getRoadmapBySlug(req: Request, res: Response) {
  const dbRoadmaps = await fetchRoadmaps();
  const source = dbRoadmaps ?? inMemoryRoadmaps;
  const roadmap = source.find((item) => item.slug === req.params.slug);

  if (!roadmap) {
    res.status(404).json({ message: "Roadmap not found" });
    return;
  }

  res.json({ roadmap });
}
