export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl animate-pulse">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="mt-4 h-8 w-72 rounded bg-slate-200" />
        <div className="mt-3 h-5 w-96 rounded bg-slate-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 rounded-lg bg-slate-100 animate-pulse" />
        ))}
      </div>
    </main>
  );
}
