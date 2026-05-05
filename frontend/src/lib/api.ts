export type LearningGoal = "employment" | "freelancing" | "academic_advantage" | "personal_growth";
export type TimeCommitment = "low" | "medium" | "high";

export type OnboardingInput = {
  background: string;
  interests: string[];
  goal: LearningGoal;
  timeCommitment: TimeCommitment;
};

export type PathRecommendation = {
  slug: string;
  title: string;
  reason: string;
  confidence: number;
};

export type RoadmapNode = {
  id: string;
  title: string;
  explanation: string;
  resourceTitle: string;
  resourceUrl: string;
  goDeeper?: string[];
};

export type Roadmap = {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate";
  nodes: RoadmapNode[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function createRecommendation(input: OnboardingInput) {
  return request<{ recommendations: PathRecommendation[]; engine: string }>("/recommendations", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function listRoadmaps() {
  return request<{ roadmaps: Roadmap[] }>("/roadmaps", {
    cache: "no-store"
  });
}
