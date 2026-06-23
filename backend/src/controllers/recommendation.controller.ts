import type { Request, Response } from "express";
import { z } from "zod";
import Groq from "groq-sdk";
import { env } from "../config/env.js";
import { supabaseAdmin, hasSupabaseConfig } from "../config/supabase.js";
import { recommendPaths } from "../services/recommendations/recommendation.service.js";
import { RecommendationResponseSchema } from "../services/ai/prompt.js";
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

  const authHeader = req.headers.authorization;
  if (supabaseAdmin && authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) {
        await supabaseAdmin.from("onboarding_responses").insert({
          user_id: user.id,
          background: input.background,
          interests: input.interests,
          goal: input.goal,
          time_commitment: input.timeCommitment,
          recommended_paths: result.recommendations || [],
        });
      }
    } catch {
      // non-blocking: silently ignore onboarding save failures
    }
  }
}

export async function chatRecommendation(req: Request, res: Response) {
  const chatSchema = z.object({
    messages: z.array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1),
      })
    ).min(1),
  });

  const { messages } = chatSchema.parse(req.body);

  const hasApiKey = Boolean(env.GROQ_API_KEY);

  if (!hasApiKey) {
    const lastMessage = messages.filter((m) => m.role === "user").pop();
    if (!lastMessage) {
      res.status(400).json({ message: "No user message found", done: true });
      return;
    }

    const mockInput = {
      background: lastMessage.content,
      interests: [],
      goal: "employment" as const,
      timeCommitment: "medium" as const,
    };

    const recs = recommendPaths(mockInput);
    res.json({
      message: "Here are your recommended paths based on what you've shared.",
      recommendations: recs,
      done: true,
    });
    return;
  }

  try {
    const client = new Groq({ apiKey: env.GROQ_API_KEY! });

    const { data: roadmapList } = hasSupabaseConfig && supabaseAdmin
      ? await supabaseAdmin.from("roadmaps").select("slug, title, description, level").then(r => ({ data: r.data || [] }))
      : { data: [
          { slug: "frontend-development", title: "Frontend Development", description: "Build user interfaces for websites and web applications.", level: "beginner" },
          { slug: "data-analysis", title: "Data Analysis", description: "Use data to answer questions and support decisions.", level: "beginner" },
          { slug: "ui-ux-design", title: "UI/UX Design", description: "Design useful, usable, and clear digital products.", level: "beginner" },
          { slug: "cybersecurity", title: "Cybersecurity", description: "Protect systems, networks, and data from digital attacks.", level: "beginner" },
          { slug: "product-management", title: "Product Management", description: "Guide products from idea to launch and beyond.", level: "beginner" },
        ]};

    const roadmapText = (roadmapList || []).map((r: any) => `${r.title} (slug: "${r.slug}") — ${r.description}`).join("\n");

    const systemPrompt = `You are Pathfinder, an AI career guide running a conversational onboarding flow.

Your goal: through a short conversation (2-4 exchanges), understand the user's background, interests, goals, and time commitment, then recommend the best tech path for them.

Available roadmaps (ONLY recommend from these):
${roadmapText}

Conversation flow:
- First message: Ask the user about their background (field of study, current profession, or what they're curious about)
- Second message: Ask about their interests and what excites them about tech
- Third message: Ask about their goal (employment, freelancing, academic, personal growth) and time commitment
- Fourth message: Deliver final recommendations with reasons

Rules:
- When you have enough information (after 3-4 exchanges), set "done": true and include recommendations
- When you need more info, set "done": false and ask a follow-up question
- Be warm, encouraging, and specific. Reference what the user said.
- NEVER hallucinate paths that don't exist
- When done, return recommendations in this exact JSON structure:

{
  "message": "your conversational response text here",
  "done": true,
  "recommendations": [
    {
      "slug": "frontend-development",
      "title": "Frontend Development",
      "reason": "specific reason...",
      "confidence": 85
    }
  ]
}

For non-final messages:
{
  "message": "your follow-up question or acknowledgment",
  "done": false
}

Return ONLY valid JSON — no markdown, no code fences.`;

    const completion = await client.chat.completions.create({
      model: env.AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty response from Groq");

    const parsed = JSON.parse(raw.trim());

    const response: {
      message: string;
      done: boolean;
      recommendations?: Array<{ slug: string; title: string; reason: string; confidence: number }>;
    } = {
      message: parsed.message || "Let me help you find the right path.",
      done: Boolean(parsed.done),
    };

    if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
      const validated = RecommendationResponseSchema.parse({ recommendations: parsed.recommendations });
      response.recommendations = validated.recommendations;
    }

    res.json(response);
  } catch (error) {
    console.error("[chat-recommendation] Groq call failed:", error);
    res.status(500).json({
      message: "Sorry, I had trouble processing that. Please try again.",
      done: false,
    });
  }
}
