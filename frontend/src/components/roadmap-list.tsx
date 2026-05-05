import { ExternalLink } from "lucide-react";
import type { Roadmap } from "@/lib/api";

export function RoadmapList({ roadmaps }: { roadmaps: Roadmap[] }) {
  return (
    <div className="grid gap-5">
      {roadmaps.map((roadmap) => (
        <section key={roadmap.slug} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">{roadmap.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{roadmap.description}</p>
            </div>
            <span className="w-fit rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold uppercase text-emerald-800">
              {roadmap.level}
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            {roadmap.nodes.map((node, index) => (
              <article key={node.id} className="border-l-2 border-emerald-600 pl-4">
                <p className="text-xs font-semibold uppercase text-slate-500">Step {index + 1}</p>
                <h3 className="mt-1 font-semibold text-slate-950">{node.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{node.explanation}</p>
                <a
                  href={node.resourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  {node.resourceTitle}
                  <ExternalLink className="size-4" />
                </a>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
