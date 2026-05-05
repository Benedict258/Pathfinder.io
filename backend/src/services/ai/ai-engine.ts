import { env } from "../../config/env.js";
import type { OnboardingInput, PathRecommendation } from "../../types/onboarding.js";
import { recommendPaths } from "../recommendations/recommendation.service.js";

export type AiPathDiscoveryResult = {
  recommendations: PathRecommendation[];
  engine: "mock" | "openai" | "anthropic";
};

export async function runPathDiscovery(input: OnboardingInput): Promise<AiPathDiscoveryResult> {
  if (env.AI_PROVIDER === "mock") {
    return {
      recommendations: recommendPaths(input),
      engine: "mock"
    };
  }

  // This is the agentic boundary: planner, tool routing, memory, and response
  // composition should stay here instead of leaking into controllers or the UI.
  // The real LLM call belongs here later, behind the same service contract.
  return {
    recommendations: recommendPaths(input),
    engine: env.AI_PROVIDER
  };
}
