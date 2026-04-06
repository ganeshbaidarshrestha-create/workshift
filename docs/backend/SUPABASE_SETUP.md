# Supabase Setup For WorkShift

This project now includes a real Supabase scaffold for:

- auth
- profiles
- jobs
- applications
- chat messages
- verification reviews
- disputes
- escrow transactions
- wallet ledger entries

## Important

I cannot create your Supabase account for you because that requires your own login, billing, and project ownership decisions.

You need to do the account/project creation in your browser:

- https://supabase.com/dashboard

## What Was Added

- [scripts/supabase.js](c:/Users/Administrator/Desktop/Workshift/scripts/supabase.js)
- [schema.sql](c:/Users/Administrator/Desktop/Workshift/supabase/schema.sql)
- [supabase/config.js](c:/Users/Administrator/Desktop/Workshift/supabase/config.js)
- [supabase/config.local.js.example](c:/Users/Administrator/Desktop/Workshift/supabase/config.local.js.example)

## Setup Steps

1. Create a Supabase project in your own account.
2. Open the SQL Editor.
3. Run [schema.sql](c:/Users/Administrator/Desktop/Workshift/supabase/schema.sql).
4. Copy [config.local.js.example](c:/Users/Administrator/Desktop/Workshift/supabase/config.local.js.example) to `supabase/config.local.js`.
5. Fill in:
   - `url`
   - `anonKey`
6. In Supabase Auth settings, enable the login methods you want:
   - email OTP / magic link
   - phone OTP if you want phone-first onboarding
7. Set your site URL and redirect URLs to your deployed WorkShift URL.

## Current Behavior After Configuration

When Supabase is configured:

- `Send OTP` will make a real Supabase OTP or magic-link request
- signup form will request real verification instead of instantly creating a demo-only local account
- login form will request real verification instead of the local-only demo login flow
- verified sessions are restored back into the portal on page load
- worker and employer profiles hydrate with country-aware rules from Supabase
- business hirers and home hirers can share the same backend role while using different account types in the UI
- marketplace jobs can be loaded from Supabase and shown in the worker discovery flow
- employer and home-service job posting can publish country-aware jobs into Supabase
- admin queue, dispute inbox, and payment list can hydrate from Supabase-backed tables
- employer escrow funding and release can write backend payment state
- worker wallet totals can derive from live ledger entries

When Supabase is not configured:

- the app continues to use the existing zero-budget local demo behavior

## Current Scope

This is now a partial live integration, not just scaffolding.

Already scaffolded:

- real auth request hooks
- schema for profiles, jobs, applications, and job messages
- country-aware profile and job fields
- RLS starter policies
- client helpers for jobs, applications, and chat
- session restoration into the portal
- live employer job publishing and editing hooks
- live worker apply hooks for Supabase-backed jobs
- employer-side live applicant pipeline hydration from Supabase applications
- employer-side shortlist, invite, hire, rate, and chat writes to Supabase
- employer-side job status and wage updates syncing back to Supabase
- worker-side live status and chat refresh without reload
- employer-side live application and chat refresh without reload
- backend schema for admin verification queue, disputes, escrows, and wallet ledgers
- admin action hooks for approve, re-request, suspend, resolve, and refund when a real admin Supabase session exists
- employer-side escrow funding and release writes
- worker-side wallet hydration from live ledger entries
- household hiring flow scaffolded with lighter profile and booking fields
- worker, employer, and home-hirer dispute creation now writes evidence-backed cases into the dispute flow
- document uploads, media previews, and dispute evidence uploads can use Supabase Storage buckets when configured
- admin and super-admin entry can use a live Supabase-authenticated session from the in-app secure access modal

Still to implement in the next pass:

- stronger release/refund orchestration and production payment-provider webhooks

## Country-Aware Additions

Profiles and jobs now include country-aware fields in the scaffold:

- `country_code`
- `currency_code`
- `phone_auth_mode`
- `payout_rail`
- `verification_rule`

If you already created the older schema, rerun [schema.sql](c:/Users/Administrator/Desktop/Workshift/supabase/schema.sql) so those columns exist before wiring live reads and writes.

## New Backend Notes

- `verification_reviews` now stores the admin queue truth instead of relying only on local demo records.
- `escrow_transactions` stores job-level marketplace payment state.
- `wallet_ledger_entries` stores worker/employer wallet movements that can be used to calculate balances.
- `disputes` stores admin-reviewable payment or job conflicts.
- `profiles.account_type` and job booking fields now distinguish business hiring from home-service hiring.

## Admin Authentication Note

The current UI still supports local admin code access for demo mode.

For live Supabase-backed admin actions, the browser session also needs to be authenticated as a Supabase `admin` or `super_admin` profile. Without that authenticated backend session, the admin portal safely falls back to local demo behavior.

## Official References

- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Realtime: https://supabase.com/docs/guides/realtime
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase JavaScript client: https://supabase.com/docs/reference/javascript/introduction
