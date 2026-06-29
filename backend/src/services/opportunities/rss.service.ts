import RssParser from "rss-parser";

const parser = new RssParser();

interface RssFeedItem {
  title: string;
  description: string;
  url: string;
  type: "scholarship" | "internship" | "event" | "job";
  location?: string;
  publishedAt?: string;
}

const FEEDS = [
  {
    url: "https://blog.google/outreach-initiatives/grow-with-google/feed/",
    type: "scholarship" as const,
  },
  {
    url: "https://techcabal.com/feed/",
    type: "event" as const,
  },
  {
    url: "https://techpoint.africa/feed/",
    type: "event" as const,
  },
];

function classifyItem(title: string, description: string): "scholarship" | "internship" | "event" | "job" {
  const text = (title + " " + description).toLowerCase();
  if (text.includes("scholarship") || text.includes("fellowship") || text.includes("grant")) return "scholarship";
  if (text.includes("internship") || text.includes("graduate trainee")) return "internship";
  if (text.includes("hiring") || text.includes("job") || text.includes("vacancy")) return "job";
  return "event";
}

let cachedItems: RssFeedItem[] = [];
let lastFetch = 0;
const CACHE_TTL = 30 * 60 * 1000;

export async function fetchRssOpportunities(): Promise<RssFeedItem[]> {
  const now = Date.now();
  if (cachedItems.length > 0 && now - lastFetch < CACHE_TTL) {
    return cachedItems;
  }

  const items: RssFeedItem[] = [];

  for (const feed of FEEDS) {
    try {
      const result = await parser.parseURL(feed.url);
      const feedItems = (result.items || []).slice(0, 10).map((item) => ({
        title: item.title || "Untitled",
        description: item.contentSnippet || item.content || "",
        url: item.link || "",
        type: classifyItem(item.title || "", item.contentSnippet || ""),
        location: undefined,
        publishedAt: item.pubDate || item.isoDate,
      }));
      items.push(...feedItems);
    } catch (err) {
      console.warn(`[rss] Failed to fetch ${feed.url}:`, (err as Error).message);
    }
  }

  cachedItems = items;
  lastFetch = now;
  return items;
}
