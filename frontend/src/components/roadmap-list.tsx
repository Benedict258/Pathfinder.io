"use client";

import { ExternalLink, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type { Roadmap } from "@/lib/api";
import { markNodeComplete, getProgress } from "@/lib/api";

export function RoadmapList({ roadmaps, token }: { roadmaps: Roadmap[]; token?: string | null }) {
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    if (token) {
      getProgress(token).then(data => {
        setCompletedNodes(data.completedNodeIds);
        setStreak(data.streak);
        setTotalCompleted(data.totalCompleted);
      }).catch(() => {});
    }
  }, [token]);

  return (
    <div className="grid gap-5">
      {token && totalCompleted > 0 && (
        <div className="mb-4 flex items-center gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-emerald-800">{totalCompleted} completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-emerald-800">{streak} day streak</span>
          </div>
        </div>
      )}

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
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase text-slate-500">Step {index + 1}</p>
                  {completedNodes.includes(node.id) && (
                    <CheckCircle className="size-4 text-emerald-600" />
                  )}
                </div>
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

                {node.goDeeper && node.goDeeper.length > 0 && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-800">
                      Go deeper ({node.goDeeper.length} resources)
                    </summary>
                    <ul className="mt-2 space-y-2 pl-4">
                      {node.goDeeper.map((item, i) => (
                        <li key={i}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900"
                          >
                            {item.title}
                            <ExternalLink className="size-3.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {token ? (
                  <button
                    onClick={async () => {
                      try {
                        await markNodeComplete(node.id, token);
                        setCompletedNodes(prev => [...prev, node.id]);
                      } catch {}
                    }}
                    disabled={completedNodes.includes(node.id)}
                    className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-3 py-1.5 ${
                      completedNodes.includes(node.id)
                        ? "bg-emerald-100 text-emerald-800"
                        : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <CheckCircle className="size-3.5" />
                    {completedNodes.includes(node.id) ? "Completed" : "Mark complete"}
                  </button>
                ) : (
                  <p className="mt-3 text-xs text-slate-400">Sign in to track progress</p>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
