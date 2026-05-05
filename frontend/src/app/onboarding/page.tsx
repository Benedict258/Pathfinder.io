import { OnboardingForm } from "@/components/onboarding-form";

export default function OnboardingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">AI-ready onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Find a focused path into tech.
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          This first version uses simple recommendation logic behind the same API boundary that will later call the AI engine.
        </p>
      </div>
      <OnboardingForm />
    </main>
  );
}
