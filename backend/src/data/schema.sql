-- Pathfinder.io MVP database draft for Supabase PostgreSQL.
-- Apply this later in the Supabase SQL editor after project setup.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  background text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.onboarding_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  background text not null,
  interests text[] not null default '{}',
  goal text not null,
  time_commitment text not null,
  recommended_paths jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table if not exists public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  level text not null default 'beginner',
  created_at timestamptz not null default now()
);

create table if not exists public.roadmap_nodes (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references public.roadmaps(id) on delete cascade,
  title text not null,
  explanation text not null,
  resource_title text not null,
  resource_url text not null,
  position integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  roadmap_node_id uuid not null references public.roadmap_nodes(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (user_id, roadmap_node_id)
);
