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
