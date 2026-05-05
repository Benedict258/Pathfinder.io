import type { OnboardingInput, PathRecommendation } from "../../types/onboarding.js";

const pathSignals = [
  {
    slug: "frontend-development",
    title: "Frontend Development",
    keywords: ["web", "website", "design", "javascript", "react", "creative", "interface"]
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    keywords: ["business", "data", "excel", "finance", "research", "numbers", "analysis"]
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    keywords: ["design", "art", "psychology", "product", "users", "creative", "figma"]
  }
];

export function recommendPaths(input: OnboardingInput): PathRecommendation[] {
  const searchText = [
    input.background,
    input.goal,
    input.timeCommitment,
    ...input.interests
  ]
    .join(" ")
    .toLowerCase();

  return pathSignals
    .map((path) => {
      const matches = path.keywords.filter((keyword) => searchText.includes(keyword));
      const confidence = Math.min(95, 55 + matches.length * 10);

      return {
        slug: path.slug,
        title: path.title,
        confidence,
        reason:
          matches.length > 0
            ? `This matches your signals around ${matches.slice(0, 3).join(", ")}.`
            : "This is a beginner-friendly path that can work well while your interests become clearer."
      };
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}
