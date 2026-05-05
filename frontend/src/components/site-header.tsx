import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-950">
          Pathfinder.io
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link href="/onboarding" className="hover:text-slate-950">
            Onboarding
          </Link>
          <Link href="/roadmaps" className="hover:text-slate-950">
            Roadmaps
          </Link>
        </nav>
      </div>
    </header>
  );
}
