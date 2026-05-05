import { ArrowRight, Route, Sparkles, Target } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-h-[520px] max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">Connecting ambition to direction</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Pathfinder.io
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              A focused MVP foundation for personalized tech path discovery, curated roadmaps, and learner progress.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/onboarding"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Start onboarding
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/roadmaps"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                View roadmaps
                <Route className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: Target,
                title: "Path discovery",
                text: "Collect background, interests, goals, and time commitment."
              },
              {
                icon: Route,
                title: "Focused roadmaps",
                text: "Show one clear explanation and one curated resource per node."
              },
              {
                icon: Sparkles,
                title: "AI-ready engine",
                text: "Keep AI behind a backend service layer for future LLM integration."
              }
            ].map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <item.icon className="size-5 text-emerald-700" />
                <h2 className="mt-4 font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
