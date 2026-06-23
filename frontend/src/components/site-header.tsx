"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase, signOut, getCurrentUser } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getCurrentUser().then(setUser).finally(() => setLoaded(true));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          <Link href="/field-study" className="hover:text-slate-950">
            Field Study
          </Link>
          <Link href="/opportunities" className="hover:text-slate-950">
            Opportunities
          </Link>
          {loaded && (
            user ? (
              <button
                onClick={async () => { await signOut(); setUser(null); }}
                className="hover:text-slate-950"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/account" className="hover:text-slate-950">
                Sign In
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
