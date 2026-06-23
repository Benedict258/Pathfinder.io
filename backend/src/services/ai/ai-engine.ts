import Groq from "groq-sdk";
import { env } from "../../config/env.js";
import { supabaseAdmin } from "../../config/supabase.js";
import type { OnboardingInput, PathRecommendation } from "../../types/onboarding.js";
import { recommendPaths } from "../recommendations/recommendation.service.js";
import { buildUserMessage, buildUserMessageWithRoadmaps, buildFieldStudyMessage, FIELD_STUDY_SYSTEM_PROMPT, SYSTEM_PROMPT, RecommendationResponseSchema } from "./prompt.js";

export type AiPathDiscoveryResult = {
  recommendations: PathRecommendation[];
  engine: "mock" | "groq" | "claude";
};

function getGroqClient(): Groq | null {
  if (!env.GROQ_API_KEY) return null;
  return new Groq({ apiKey: env.GROQ_API_KEY });
}

async function getAvailableRoadmaps(): Promise<Array<{slug: string, title: string, description: string, level: string}>> {
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin.from("roadmaps").select("slug, title, description, level");
    if (data && data.length > 0) return data;
  }
  return [
    { slug: "frontend-development", title: "Frontend Development", description: "Build user interfaces for websites and web applications.", level: "beginner" },
    { slug: "data-analysis", title: "Data Analysis", description: "Use data to answer questions and support decisions.", level: "beginner" },
    { slug: "ui-ux-design", title: "UI/UX Design", description: "Design useful, usable, and clear digital products.", level: "beginner" },
    { slug: "cybersecurity", title: "Cybersecurity", description: "Protect systems, networks, and data from digital attacks.", level: "beginner" },
    { slug: "product-management", title: "Product Management", description: "Guide products from idea to launch and beyond.", level: "beginner" },
  ];
}

async function callGroq(input: OnboardingInput): Promise<PathRecommendation[]> {
  const client = getGroqClient();
  if (!client) {
    console.warn("[ai-engine] GROQ_API_KEY not set — falling back to mock engine");
    return recommendPaths(input);
  }

  try {
    const completion = await client.chat.completions.create({
      model: env.AI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserMessageWithRoadmaps(input, await getAvailableRoadmaps()) },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty response from Groq");

    const parsed = JSON.parse(raw.trim());
    const validated = RecommendationResponseSchema.parse(parsed);

    return validated.recommendations;
  } catch (error) {
    console.error("[ai-engine] Groq call failed:", error);
    console.warn("[ai-engine] Falling back to mock engine");
    return recommendPaths(input);
  }
}

export async function runPathDiscovery(input: OnboardingInput): Promise<AiPathDiscoveryResult> {
  if (env.AI_PROVIDER === "mock") {
    return {
      recommendations: recommendPaths(input),
      engine: "mock",
    };
  }

  if (env.AI_PROVIDER === "groq") {
    const recommendations = await callGroq(input);
    return { recommendations, engine: "groq" };
  }

  // Claude provider (future) or unknown — fall back to mock
  return {
    recommendations: recommendPaths(input),
    engine: env.AI_PROVIDER,
  };
}

export async function runFieldStudyDiscovery(field: string): Promise<AiPathDiscoveryResult> {
  if (env.AI_PROVIDER === "mock") {
    const fieldLower = field.toLowerCase();
    const signals: Record<string, string[]> = {
      "data-analysis": ["business", "finance", "economics", "statistics", "accounting", "agriculture", "medicine", "health", "research"],
      "frontend-development": ["engineering", "computer science", "it", "design", "arts", "fine art", "creative"],
      "ui-ux-design": ["design", "arts", "fine art", "mass communication", "media", "journalism", "psychology"],
      "cybersecurity": ["law", "political science", "computer science", "engineering", "it", "criminology"],
      "product-management": ["business", "marketing", "mass communication", "law", "economics", "management"],
    };

    const recommendations = Object.entries(signals)
      .map(([slug, keywords]) => {
        const matches = keywords.filter(k => fieldLower.includes(k));
        return {
          slug,
          title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          confidence: Math.min(95, 55 + matches.length * 12),
          reason: matches.length > 0
            ? `Your background in ${field} maps well to this path through ${matches.slice(0, 2).join(" and ")}.`
            : "This path is beginner-friendly and can complement your background while you explore tech.",
        };
      })
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);

    return { recommendations, engine: "mock" };
  }

  if (env.AI_PROVIDER === "groq") {
    const client = getGroqClient();
    if (!client) {
      console.warn("[ai-engine] GROQ_API_KEY not set — falling back to mock for field study");
      return runFieldStudyDiscovery(field);
    }

    try {
      const roadmaps = await getAvailableRoadmaps();
      const completion = await client.chat.completions.create({
        model: env.AI_MODEL,
        messages: [
          { role: "system", content: FIELD_STUDY_SYSTEM_PROMPT },
          { role: "user", content: buildFieldStudyMessage(field, roadmaps) },
        ],
        temperature: 0.7,
        max_tokens: 600,
      });

      const raw = completion.choices[0]?.message?.content;
      if (!raw) throw new Error("Empty response from Groq");

      const parsed = JSON.parse(raw.trim());
      const validated = RecommendationResponseSchema.parse(parsed);
      return { recommendations: validated.recommendations, engine: "groq" };
    } catch (error) {
      console.error("[ai-engine] Field study Groq call failed:", error);
      return runFieldStudyDiscovery(field);
    }
  }

  return runFieldStudyDiscovery(field);
}
