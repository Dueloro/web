create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  source text not null default 'website',
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists waitlist_surveys (
  waitlist_id uuid primary key references waitlist_signups(id) on delete cascade,
  wager_frequency text,
  platform_familiarity jsonb not null default '{}',
  priorities text[] not null default '{}',
  completed_at timestamptz
);
create index if not exists waitlist_signups_created_at_idx on waitlist_signups(created_at desc);
