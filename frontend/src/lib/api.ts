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
  goDeeper?: { title: string; url: string }[];
};

export type Roadmap = {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate";
  nodes: RoadmapNode[];
};

export type AiEngine = "mock" | "groq" | "claude";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  message: string;
  recommendations?: PathRecommendation[];
  done: boolean;
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
  return request<{ recommendations: PathRecommendation[]; engine: AiEngine }>("/recommendations", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function listRoadmaps() {
  return request<{ roadmaps: Roadmap[] }>("/roadmaps", {
    cache: "no-store"
  });
}

export function recommendByField(field: string) {
  return request<{ recommendations: PathRecommendation[]; engine: AiEngine }>("/field-study", {
    method: "POST",
    body: JSON.stringify({ field }),
  });
}

export function sendChatMessage(messages: ChatMessage[]) {
  return request<ChatResponse>("/recommendations/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });
}

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  type: "scholarship" | "internship" | "event" | "job";
  url: string;
  deadline?: string;
  location?: string;
};

export function listOpportunities(type?: string) {
  const query = type ? `?type=${type}` : "";
  return request<{ opportunities: Opportunity[] }>(`/opportunities${query}`);
}

export function markNodeComplete(nodeId: string, token: string) {
  return request<{ success: boolean; streak: number }>("/progress/complete", {
    method: "POST",
    body: JSON.stringify({ node_id: nodeId }),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getProgress(token: string) {
  return request<{ completedNodeIds: string[]; streak: number; totalCompleted: number }>("/progress", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
