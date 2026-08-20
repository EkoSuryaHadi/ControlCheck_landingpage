-- KurvaUp AI Lab v0.3 - run in Supabase SQL Editor
create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  product_slug text,
  session_id text,
  visitor_id text,
  path text,
  properties jsonb not null default '{}'::jsonb,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at desc);
create index if not exists analytics_events_product_idx on public.analytics_events(product_slug, event_name);
create index if not exists analytics_events_visitor_idx on public.analytics_events(visitor_id);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  product_slug text,
  name text,
  email text,
  rating int check (rating between 1 and 5),
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.product_ideas (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  role text,
  problem text not null,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;
alter table public.feedback enable row level security;
alter table public.product_ideas enable row level security;
-- No public policies are required: writes happen via server-only service-role API routes.
