import type { Request, Response } from "express";
import { opportunities, type Opportunity } from "../data/opportunities.js";
import { fetchRssOpportunities } from "../services/opportunities/rss.service.js";

export async function listOpportunities(req: Request, res: Response) {
  const { type } = req.query;

  let rssItems: Opportunity[] = [];
  try {
    const rss = await fetchRssOpportunities();
    rssItems = rss.map((item, i) => ({
      id: `rss-${i}`,
      title: item.title,
      description: item.description.slice(0, 300),
      type: item.type,
      url: item.url,
      location: item.location,
      deadline: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : undefined,
      source: "rss" as const,
    }));
  } catch (err) {
    console.warn("[opportunities] RSS fetch failed, using only curated items");
  }

  const seenUrls = new Set<string>();
  const all = [...opportunities, ...rssItems].filter((item) => {
    if (seenUrls.has(item.url)) return false;
    seenUrls.add(item.url);
    return true;
  });

  let filtered = all;
  if (type && typeof type === "string") {
    filtered = all.filter((o) => o.type === type);
  }

  res.json({ opportunities: filtered });
}
