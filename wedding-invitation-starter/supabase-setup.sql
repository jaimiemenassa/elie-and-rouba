-- Run this in Supabase Dashboard → SQL Editor → New query.
-- Public visitors can submit RSVPs, but cannot read, edit, or delete guest responses.

create table if not exists public.wedding_rsvps (
  id bigint generated always as identity primary key,
  guest_name text not null check (char_length(guest_name) between 1 and 100),
  attending boolean not null,
  guest_count integer not null default 0 check (guest_count between 0 and 6),
  message text check (message is null or char_length(message) <= 500),
  created_at timestamptz not null default now()
);

alter table public.wedding_rsvps enable row level security;

drop policy if exists "Anyone can submit an RSVP" on public.wedding_rsvps;
create policy "Anyone can submit an RSVP"
on public.wedding_rsvps
for insert
to anon, authenticated
with check (
  char_length(trim(guest_name)) > 0
  and guest_count between 0 and 6
);

-- Intentionally do NOT create a public SELECT policy.
-- View responses from the Supabase dashboard while signed in as an authorized project admin.
