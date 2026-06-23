"use client";

import { useState } from "react";
import { OnboardingForm } from "@/components/onboarding-form";
import { OnboardingChat } from "@/components/onboarding-chat";

export default function OnboardingPage() {
  const [mode, setMode] = useState<"form" | "chat">("chat");

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">AI-ready onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Find a focused path into tech.
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Powered by Llama 3.3 via Groq for fast, intelligent path recommendations.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("chat")}
            className={`rounded-md px-4 py-2 text-sm font-semibold ${
              mode === "chat"
                ? "bg-slate-950 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            Chat
          </button>
          <button
            type="button"
            onClick={() => setMode("form")}
            className={`rounded-md px-4 py-2 text-sm font-semibold ${
              mode === "form"
                ? "bg-slate-950 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            Form
          </button>
        </div>
      </div>

      {mode === "chat" ? <OnboardingChat /> : <OnboardingForm />}
    </main>
  );
}
