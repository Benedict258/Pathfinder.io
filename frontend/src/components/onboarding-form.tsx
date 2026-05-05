"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import {
  createRecommendation,
  PathRecommendation,
  type LearningGoal,
  type TimeCommitment
} from "@/lib/api";

const interestOptions = ["Web", "Data", "Design", "Business", "Research", "Creative", "Cybersecurity"];

export function OnboardingForm() {
  const [background, setBackground] = useState("");
  const [goal, setGoal] = useState<LearningGoal>("employment");
  const [timeCommitment, setTimeCommitment] = useState<TimeCommitment>("medium");
  const [interests, setInterests] = useState<string[]>(["Web"]);
  const [recommendations, setRecommendations] = useState<PathRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleInterest(interest: string) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await createRecommendation({
        background,
        interests,
        goal,
        timeCommitment
      });
      setRecommendations(result.recommendations);
    } catch {
      setError("Could not reach the backend. Make sure the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="background" className="block text-sm font-medium text-slate-800">
            Field of study or current profession
          </label>
          <input
            id="background"
            value={background}
            onChange={(event) => setBackground(event.target.value)}
            placeholder="Example: Business student, Mass Communication graduate"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            required
          />
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-800">Interest signals</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const active = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-md border px-3 py-2 text-sm font-medium ${
                    active
                      ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-800">
            Main goal
            <select
              value={goal}
              onChange={(event) => setGoal(event.target.value as LearningGoal)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="employment">Employment</option>
              <option value="freelancing">Freelancing</option>
              <option value="academic_advantage">Academic advantage</option>
              <option value="personal_growth">Personal growth</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-800">
            Weekly time
            <select
              value={timeCommitment}
              onChange={(event) => setTimeCommitment(event.target.value as TimeCommitment)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="low">1-3 hours</option>
              <option value="medium">4-7 hours</option>
              <option value="high">8+ hours</option>
            </select>
          </label>
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
          Find my path
        </button>
      </form>

      <aside className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-base font-semibold text-slate-950">Recommended paths</h2>
        <div className="mt-5 space-y-4">
          {recommendations.length === 0 ? (
            <p className="text-sm leading-6 text-slate-600">
              Complete the form to test the MVP recommendation engine.
            </p>
          ) : (
            recommendations.map((item) => (
              <div key={item.slug} className="rounded-md border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-950">{item.title}</h3>
                  <span className="text-sm font-semibold text-emerald-700">{item.confidence}%</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
