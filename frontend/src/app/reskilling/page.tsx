"use client";

import { ArrowRight, Loader2, Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { recommendReskilling, type PathRecommendation } from "@/lib/api";

export default function ReskillingPage() {
  const [currentRole, setCurrentRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [targetIndustry, setTargetIndustry] = useState("");
  const [recommendations, setRecommendations] = useState<PathRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function addSkill() {
    const trimmed = skillInput.trim();
    if (trimmed && !currentSkills.includes(trimmed)) {
      setCurrentSkills([...currentSkills, trimmed]);
      setSkillInput("");
    }
  }

  function removeSkill(skill: string) {
    setCurrentSkills(currentSkills.filter((s) => s !== skill));
  }

  function handleSkillKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await recommendReskilling(
        currentRole,
        currentSkills,
        targetIndustry || undefined
      );
      setRecommendations(result.recommendations);
    } catch {
      setError("Could not reach the backend. Make sure the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">Reskilling</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Transition into tech from any career.
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Tell us your current role and skills to discover which tech path fits your experience best.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="currentRole" className="block text-sm font-medium text-slate-800">
              Current role / job title
            </label>
            <input
              id="currentRole"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder="e.g. Registered Nurse, High School Teacher, Accountant"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">
              Current skills
            </label>
            <div className="mt-2 flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g. Communication, Project management, Excel"
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              >
                <Plus className="size-4" />
              </button>
            </div>
            {currentSkills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currentSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-emerald-600 hover:text-emerald-800"
                    >
                      <X className="size-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="targetIndustry" className="block text-sm font-medium text-slate-800">
              Target industry (optional)
            </label>
            <input
              id="targetIndustry"
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              placeholder="e.g. Fintech, Healthcare, Education"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

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
                Enter your current role and skills to see recommended tech career paths.
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
    </main>
  );
}
