import { RoadmapList } from "@/components/roadmap-list";
import { listRoadmaps, type Roadmap } from "@/lib/api";

export default async function RoadmapsPage() {
  let roadmaps: Roadmap[] = [];
  let error = "";

  try {
    const result = await listRoadmaps();
    roadmaps = result.roadmaps;
  } catch {
    error = "Could not load roadmaps. Start the backend server and refresh this page.";
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">Focused roadmaps</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          One clear resource per concept.
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          These starter roadmaps are seeded in the backend for the MVP foundation. Later, they can move into Supabase.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-medium text-amber-900">
          {error}
        </div>
      ) : (
        <RoadmapList roadmaps={roadmaps} />
      )}
    </main>
  );
}
