"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { recommendByField, type PathRecommendation } from "@/lib/api";

export default function FieldStudyPage() {
  const [field, setField] = useState("");
  const [recommendations, setRecommendations] = useState<PathRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await recommendByField(field);
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
        <p className="text-sm font-semibold uppercase text-emerald-700">Field of study</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          What tech path fits your background?
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Enter your field of study or profession to get personalized tech career recommendations.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="field" className="block text-sm font-medium text-slate-800">
              Your field of study or profession
            </label>
            <input
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. Business Administration, Mass Communication, Electrical Engineering"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              required
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
                Enter your field of study to see personalized tech path recommendations.
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
