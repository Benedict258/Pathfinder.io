import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { listOpportunities, type Opportunity } from "@/lib/api";

export const metadata: Metadata = {
  title: "Tech Opportunities",
  description:
    "Curated scholarships, internships, events, and jobs for breaking into and growing within tech.",
};

const typeLabels: Record<string, { label: string; color: string }> = {
  scholarship: { label: "Scholarship", color: "bg-purple-100 text-purple-800" },
  internship: { label: "Internship", color: "bg-blue-100 text-blue-800" },
  event: { label: "Event", color: "bg-emerald-100 text-emerald-800" },
  job: { label: "Job", color: "bg-amber-100 text-amber-800" },
};

export default async function OpportunitiesPage() {
  let opportunities: Opportunity[] = [];
  let error = "";

  try {
    const result = await listOpportunities();
    opportunities = result.opportunities;
  } catch {
    error = "Could not load opportunities. Start the backend server and refresh.";
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">Opportunities feed</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Discover tech opportunities.
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Curated scholarships, internships, events, and jobs for breaking into and growing within tech. Includes live updates from Google Africa, TechCabal, and Techpoint Africa.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-medium text-amber-900">
          {error}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {opportunities.map((item) => (
            <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-slate-950">{item.title}</h2>
                <div className="flex items-center gap-1.5">
                  {item.source === "rss" && (
                    <span className="w-fit rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-700">
                      RSS
                    </span>
                  )}
                  <span
                    className={`w-fit rounded-md px-2 py-0.5 text-xs font-semibold uppercase ${typeLabels[item.type]?.color || "bg-slate-100 text-slate-700"}`}
                  >
                    {typeLabels[item.type]?.label || item.type}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                {item.location && <span>{item.location}</span>}
                {item.deadline && <span>Deadline: {item.deadline}</span>}
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                View details
                <ExternalLink className="size-4" />
              </a>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
