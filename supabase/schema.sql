-- ============================================================================
-- SunScale Pro — Database Schema
-- Run this once in your Supabase project's SQL editor
-- (Dashboard → SQL Editor → New query → paste this whole file → Run)
-- ============================================================================

-- 1. PROFILES ----------------------------------------------------------------
-- One row per authenticated user. Auto-created on signup by the trigger below.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company text,
  role text default 'Engineer',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles are editable by owner" on public.profiles;
create policy "Profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatically create a profile row whenever a new user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, company)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'company', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. CUSTOMERS ----------------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  type text not null default 'Residential',
  email text,
  phone text,
  address text,
  status text not null default 'Lead',
  created_at timestamptz not null default now()
);

alter table public.customers enable row level security;

drop policy if exists "Customers are managed by owner" on public.customers;
create policy "Customers are managed by owner"
  on public.customers for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- 3. PROJECTS -----------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  client_name text not null,
  client_email text,
  client_phone text,
  building_type text default 'residential',
  address text,
  latitude numeric,
  longitude numeric,
  roof_type text,
  grid_type text default 'on-grid',
  backup_hours numeric,
  notes text,
  status text not null default 'Design',
  system_size_kwp numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Projects are managed by owner" on public.projects;
create policy "Projects are managed by owner"
  on public.projects for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- 4. LOAD AUDITS ---------------------------------------------------------------
create table if not exists public.load_audits (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  appliances jsonb not null default '[]'::jsonb,
  peak_load_kw numeric,
  daily_consumption_kwh numeric,
  recommended_kwp numeric,
  created_at timestamptz not null default now()
);

alter table public.load_audits enable row level security;

drop policy if exists "Load audits are managed by owner" on public.load_audits;
create policy "Load audits are managed by owner"
  on public.load_audits for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- 5. QUOTATIONS -----------------------------------------------------------------
create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  line_items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  status text not null default 'Draft',
  valid_until date,
  created_at timestamptz not null default now()
);

alter table public.quotations enable row level security;

drop policy if exists "Quotations are managed by owner" on public.quotations;
create policy "Quotations are managed by owner"
  on public.quotations for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Done. Every table above only lets a signed-in user see/edit their own rows.
