create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('worker', 'employer', 'admin', 'super_admin')),
  account_type text not null default 'business' check (account_type in ('business', 'household')),
  full_name text not null default '',
  contact text not null default '',
  company_name text not null default '',
  country_code text not null default 'NP',
  currency_code text not null default 'NPR',
  phone_auth_mode text not null default 'Phone OTP preferred',
  payout_rail text not null default 'eSewa wallet or bank transfer',
  verification_rule text not null default 'Government ID, selfie, and local address or phone proof',
  verification_status text not null default 'Pending',
  notes text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text not null,
  hirer_type text not null default 'business' check (hirer_type in ('business', 'household')),
  booking_mode text not null default 'crew',
  pay_unit text not null default 'daily',
  country_code text not null default 'NP',
  currency_code text not null default 'NPR',
  payout_rail text not null default 'eSewa wallet or bank transfer',
  verification_rule text not null default 'Government ID, selfie, and local address or phone proof',
  location text not null,
  service_address text not null default '',
  start_window text not null default '',
  required_skills text[] not null default '{}',
  duration text not null default '1 day',
  pay_rate numeric(12,2) not null default 0,
  headcount integer not null default 1,
  status text not null default 'open' check (status in ('draft', 'open', 'ongoing', 'completed', 'cancelled', 'paused')),
  notes text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  worker_id uuid not null references public.profiles(id) on delete cascade,
  cover_note text not null default '',
  status text not null default 'applied' check (status in ('applied', 'shortlisted', 'invited', 'hired', 'rated', 'rejected')),
  applied_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (job_id, worker_id)
);

create table if not exists public.job_messages (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.job_applications(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  sender_role text not null check (sender_role in ('worker', 'employer', 'admin', 'super_admin')),
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.verification_reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  review_type text not null default 'Worker Identity',
  region text not null default '',
  risk_level text not null default 'Low' check (risk_level in ('Low', 'Medium', 'High')),
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Re-upload requested', 'Suspended')),
  onboarding_mode text not null default 'self',
  helper_name text not null default '',
  voice_language text not null default '',
  review_note text not null default '',
  reviewer_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  reviewed_at timestamptz
);

create table if not exists public.escrow_transactions (
  id uuid primary key default gen_random_uuid(),
  application_id uuid unique references public.job_applications(id) on delete set null,
  job_id uuid not null references public.jobs(id) on delete cascade,
  employer_id uuid not null references public.profiles(id) on delete cascade,
  worker_id uuid references public.profiles(id) on delete set null,
  country_code text not null default 'NP',
  currency_code text not null default 'NPR',
  payout_rail text not null default 'eSewa wallet or bank transfer',
  gross_amount numeric(12,2) not null default 0,
  platform_fee numeric(12,2) not null default 0,
  net_amount numeric(12,2) not null default 0,
  status text not null default 'draft' check (status in ('draft', 'funded', 'released', 'refunded', 'disputed', 'cancelled')),
  note text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  released_at timestamptz,
  refunded_at timestamptz
);

create table if not exists public.wallet_ledger_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  escrow_id uuid references public.escrow_transactions(id) on delete set null,
  entry_key text not null unique,
  direction text not null check (direction in ('credit', 'debit', 'hold', 'release', 'refund')),
  amount numeric(12,2) not null default 0,
  currency_code text not null default 'NPR',
  status text not null default 'pending' check (status in ('pending', 'completed', 'reversed')),
  note text not null default '',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.job_applications(id) on delete set null,
  escrow_id uuid references public.escrow_transactions(id) on delete set null,
  opened_by uuid not null references public.profiles(id) on delete cascade,
  against_profile_id uuid references public.profiles(id) on delete set null,
  reason text not null,
  status text not null default 'Open' check (status in ('Open', 'Reviewing', 'Refund issued', 'Resolved', 'Closed')),
  resolution_note text not null default '',
  evidence jsonb not null default '[]'::jsonb,
  amount numeric(12,2) not null default 0,
  currency_code text not null default 'NPR',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  resolved_at timestamptz
);

alter table public.disputes add column if not exists evidence jsonb not null default '[]'::jsonb;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();

drop trigger if exists job_applications_set_updated_at on public.job_applications;
create trigger job_applications_set_updated_at
before update on public.job_applications
for each row execute function public.set_updated_at();

drop trigger if exists verification_reviews_set_updated_at on public.verification_reviews;
create trigger verification_reviews_set_updated_at
before update on public.verification_reviews
for each row execute function public.set_updated_at();

drop trigger if exists escrow_transactions_set_updated_at on public.escrow_transactions;
create trigger escrow_transactions_set_updated_at
before update on public.escrow_transactions
for each row execute function public.set_updated_at();

drop trigger if exists disputes_set_updated_at on public.disputes;
create trigger disputes_set_updated_at
before update on public.disputes
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.job_messages enable row level security;
alter table public.verification_reviews enable row level security;
alter table public.escrow_transactions enable row level security;
alter table public.wallet_ledger_entries enable row level security;
alter table public.disputes enable row level security;

drop policy if exists "profiles_select_own_or_authenticated" on public.profiles;
create policy "profiles_select_own_or_authenticated"
on public.profiles
for select
to authenticated
using (
  auth.uid() is not null
  and (
    auth.uid() = id
    or role in ('worker', 'employer')
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "profiles_upsert_own" on public.profiles;
create policy "profiles_upsert_own"
on public.profiles
for all
to authenticated
using (
  auth.uid() is not null
  and (
    auth.uid() = id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role = 'super_admin'
    )
  )
)
with check (
  auth.uid() is not null
  and (
    auth.uid() = id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role = 'super_admin'
    )
  )
);

drop policy if exists "jobs_select_open_or_participant" on public.jobs;
create policy "jobs_select_open_or_participant"
on public.jobs
for select
to authenticated
using (
  auth.uid() is not null
  and (
    status in ('open', 'ongoing')
    or employer_id = auth.uid()
    or exists (
      select 1
      from public.job_applications ja
      where ja.job_id = jobs.id
      and ja.worker_id = auth.uid()
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "jobs_insert_employer_own" on public.jobs;
create policy "jobs_insert_employer_own"
on public.jobs
for insert
to authenticated
with check (
  auth.uid() is not null
  and employer_id = auth.uid()
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'employer'
  )
);

drop policy if exists "jobs_update_employer_own" on public.jobs;
create policy "jobs_update_employer_own"
on public.jobs
for update
to authenticated
using (
  auth.uid() is not null
  and (
    employer_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'super_admin')
    )
  )
)
with check (
  auth.uid() is not null
  and (
    employer_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "applications_select_participants" on public.job_applications;
create policy "applications_select_participants"
on public.job_applications
for select
to authenticated
using (
  auth.uid() is not null
  and (
    worker_id = auth.uid()
    or exists (
      select 1 from public.jobs j
      where j.id = job_applications.job_id
      and j.employer_id = auth.uid()
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "applications_insert_worker_own" on public.job_applications;
create policy "applications_insert_worker_own"
on public.job_applications
for insert
to authenticated
with check (
  auth.uid() is not null
  and worker_id = auth.uid()
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'worker'
  )
);

drop policy if exists "applications_update_employer_or_worker" on public.job_applications;
create policy "applications_update_employer_or_worker"
on public.job_applications
for update
to authenticated
using (
  auth.uid() is not null
  and (
    worker_id = auth.uid()
    or exists (
      select 1 from public.jobs j
      where j.id = job_applications.job_id
      and j.employer_id = auth.uid()
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
)
with check (
  auth.uid() is not null
  and (
    worker_id = auth.uid()
    or exists (
      select 1 from public.jobs j
      where j.id = job_applications.job_id
      and j.employer_id = auth.uid()
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "messages_select_participants" on public.job_messages;
create policy "messages_select_participants"
on public.job_messages
for select
to authenticated
using (
  auth.uid() is not null
  and exists (
    select 1
    from public.job_applications ja
    join public.jobs j on j.id = ja.job_id
    where ja.id = job_messages.application_id
    and (
      ja.worker_id = auth.uid()
      or j.employer_id = auth.uid()
      or exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role in ('admin', 'super_admin')
      )
    )
  )
);

drop policy if exists "messages_insert_participants" on public.job_messages;
create policy "messages_insert_participants"
on public.job_messages
for insert
to authenticated
with check (
  auth.uid() is not null
  and sender_id = auth.uid()
  and exists (
    select 1
    from public.job_applications ja
    join public.jobs j on j.id = ja.job_id
    where ja.id = job_messages.application_id
    and (
      ja.worker_id = auth.uid()
      or j.employer_id = auth.uid()
      or exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role in ('admin', 'super_admin')
      )
    )
  )
);

drop policy if exists "verification_reviews_select_admin_or_owner" on public.verification_reviews;
create policy "verification_reviews_select_admin_or_owner"
on public.verification_reviews
for select
to authenticated
using (
  auth.uid() is not null
  and (
    profile_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "verification_reviews_insert_owner" on public.verification_reviews;
create policy "verification_reviews_insert_owner"
on public.verification_reviews
for insert
to authenticated
with check (
  auth.uid() is not null
  and profile_id = auth.uid()
);

drop policy if exists "verification_reviews_update_admin_or_owner" on public.verification_reviews;
create policy "verification_reviews_update_admin_or_owner"
on public.verification_reviews
for update
to authenticated
using (
  auth.uid() is not null
  and (
    profile_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
)
with check (
  auth.uid() is not null
  and (
    profile_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "escrow_transactions_select_participants_or_admin" on public.escrow_transactions;
create policy "escrow_transactions_select_participants_or_admin"
on public.escrow_transactions
for select
to authenticated
using (
  auth.uid() is not null
  and (
    employer_id = auth.uid()
    or worker_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "escrow_transactions_insert_employer_or_admin" on public.escrow_transactions;
create policy "escrow_transactions_insert_employer_or_admin"
on public.escrow_transactions
for insert
to authenticated
with check (
  auth.uid() is not null
  and (
    employer_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "escrow_transactions_update_participants_or_admin" on public.escrow_transactions;
create policy "escrow_transactions_update_participants_or_admin"
on public.escrow_transactions
for update
to authenticated
using (
  auth.uid() is not null
  and (
    employer_id = auth.uid()
    or worker_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
)
with check (
  auth.uid() is not null
  and (
    employer_id = auth.uid()
    or worker_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "wallet_ledger_entries_select_owner_or_admin" on public.wallet_ledger_entries;
create policy "wallet_ledger_entries_select_owner_or_admin"
on public.wallet_ledger_entries
for select
to authenticated
using (
  auth.uid() is not null
  and (
    profile_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "wallet_ledger_entries_insert_participant_or_admin" on public.wallet_ledger_entries;
create policy "wallet_ledger_entries_insert_participant_or_admin"
on public.wallet_ledger_entries
for insert
to authenticated
with check (
  auth.uid() is not null
  and (
    profile_id = auth.uid()
    or exists (
      select 1 from public.escrow_transactions e
      where e.id = wallet_ledger_entries.escrow_id
      and (e.employer_id = auth.uid() or e.worker_id = auth.uid())
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "disputes_select_participants_or_admin" on public.disputes;
create policy "disputes_select_participants_or_admin"
on public.disputes
for select
to authenticated
using (
  auth.uid() is not null
  and (
    opened_by = auth.uid()
    or against_profile_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "disputes_insert_participant_or_admin" on public.disputes;
create policy "disputes_insert_participant_or_admin"
on public.disputes
for insert
to authenticated
with check (
  auth.uid() is not null
  and (
    opened_by = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

drop policy if exists "disputes_update_participants_or_admin" on public.disputes;
create policy "disputes_update_participants_or_admin"
on public.disputes
for update
to authenticated
using (
  auth.uid() is not null
  and (
    opened_by = auth.uid()
    or against_profile_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
)
with check (
  auth.uid() is not null
  and (
    opened_by = auth.uid()
    or against_profile_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
    )
  )
);

insert into storage.buckets (id, name, public)
values ('workshift-documents', 'workshift-documents', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('workshift-evidence', 'workshift-evidence', true)
on conflict (id) do nothing;

drop policy if exists "workshift_documents_select" on storage.objects;
create policy "workshift_documents_select"
on storage.objects
for select
to authenticated
using (bucket_id in ('workshift-documents', 'workshift-evidence'));

drop policy if exists "workshift_documents_insert" on storage.objects;
create policy "workshift_documents_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('workshift-documents', 'workshift-evidence')
  and auth.uid() is not null
);

drop policy if exists "workshift_documents_update" on storage.objects;
create policy "workshift_documents_update"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('workshift-documents', 'workshift-evidence')
  and auth.uid() is not null
)
with check (
  bucket_id in ('workshift-documents', 'workshift-evidence')
  and auth.uid() is not null
);

drop policy if exists "workshift_documents_delete" on storage.objects;
create policy "workshift_documents_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('workshift-documents', 'workshift-evidence')
  and auth.uid() is not null
);
