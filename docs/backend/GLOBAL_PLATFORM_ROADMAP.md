# WorkShift Global Platform Roadmap

This document turns the current prototype-only parts of WorkShift into a staged, research-backed path toward a global platform.

## Current Reality

The current repository is a static prototype:

- frontend-only
- browser `localStorage` persistence
- no secure backend
- no real external service integrations

That is fine for zero-budget demo use, but not for a true global marketplace.

## Recommended Architecture

### Phase 0: Keep The Prototype Cheap

Use the current static app for:

- demo environments
- UX iteration
- flow validation
- investor walkthroughs
- internal product testing

Keep costs near zero by:

- hosting on Vercel Hobby
- storing state locally in browser for demo mode
- avoiding paid OTP, messaging, payments, and KYC until the first real launch market is chosen

### Phase 1: Production MVP In One Market

Recommended core stack:

- Frontend: current app or a framework migration later
- Hosting: Vercel
- Auth + database + storage + realtime: Supabase
- OTP for first launch market: email OTP first, then phone OTP via Twilio only where needed
- Payments/marketplace: Stripe Connect in supported countries
- Notifications: Firebase Cloud Messaging for web/mobile push
- Background jobs: Vercel Queues or Supabase Edge Functions

Why this stack:

- lowest complexity for a small team
- strong free/low-cost entry point
- good developer speed
- enough headroom for a serious MVP

### Phase 2: Regional Scale

When multiple countries and heavier realtime usage arrive:

- keep Supabase for auth/data if it still fits
- move chat/presence/high-fanout realtime to Ably or Cloudflare Durable Objects
- move file-heavy storage and media delivery to Cloudflare R2 plus CDN strategy
- separate operational services:
  - auth
  - marketplace API
  - payments
  - messaging
  - notifications
  - moderation/risk

### Phase 3: Global Platform

By the time WorkShift is operating across many countries, the platform should be decomposed into domain services:

- Identity and auth service
- Worker profile and reputation service
- Employer and job posting service
- Application and hiring workflow service
- Realtime messaging service
- Payment and payout orchestration service
- Compliance and KYC service
- Notification service
- Fraud and trust service
- Analytics and operations service

## Simulated Feature To Production Path

### 1. OTP And Account Verification

Current state:

- fake OTP feedback in UI
- no real verification backend

Production path:

- start with Supabase Auth for email OTP and session management
- add phone auth only in markets where phone-first onboarding is essential
- use Twilio Verify where direct phone verification is required

Practical recommendation:

- zero-budget and early MVP: email OTP + magic link
- phone verification only for approved worker/employer flows where fraud risk justifies cost

### 2. Voice Onboarding

Current state:

- guided UI copy only
- no speech pipeline

Production path:

- phase 1: human-assisted onboarding plus recorded prompts
- phase 2: browser/mobile speech capture and transcription
- phase 3: voice agent support for low-literacy onboarding

Practical recommendation:

- do not start with full AI voice as a core dependency
- first use assisted flows + structured forms + translated prompts
- add voice later for regions where literacy, device constraints, and support load justify it

### 3. QR Check-In / Check-Out

Current state:

- visible action buttons only

Production path:

- create server-issued signed job session tokens
- employer receives a rotating QR tied to job, site, and time window
- worker scan creates attendance event in backend
- optional geofence or proof photo added on top

Practical recommendation:

- use signed short-lived tokens, not plain static QR codes
- persist attendance events with audit timestamps

### 4. Payments / Escrow

Current state:

- simulated escrow state in UI

Production path:

- use Stripe Connect for supported marketplace geographies
- implement platform, worker, and employer accounts
- model payment states separately:
  - authorized
  - held
  - released
  - refunded
  - disputed

Important note:

- "escrow" in marketplace products is usually platform-managed hold/release logic, not always true legal escrow
- legal and compliance review is needed country by country

### 5. Notifications

Current state:

- in-app arrays only

Production path:

- use Firebase Cloud Messaging for push
- use transactional email for fallback
- use SMS only for critical onboarding and job alerts where conversion matters
- queue all outbound notifications through an async worker layer

### 6. Backend Auth And Authorization

Current state:

- local role switching plus local storage
- no secure server checks

Production path:

- use server-validated sessions
- define role claims
- enforce authorization on the backend
- add row-level access rules for worker/employer/admin data separation

### 7. Realtime Infrastructure

Current state:

- chat and status sync are local-state simulation only

Production path:

- early stage: Supabase Realtime for chat, presence, and status updates
- heavy scale: move chat/presence/high-fanout events to Ably or Cloudflare Durable Objects

## Zero-Budget To Global Sequence

### Cheapest Viable Sequence

1. Keep static Vercel frontend for prototype
2. Add portable build tooling
3. Add Supabase for auth, database, storage, and basic realtime
4. Use email OTP first
5. Add Twilio Verify only where phone verification is essential
6. Add Stripe Connect only in launch countries where marketplace payouts are supported
7. Add FCM for push once mobile/web app accounts exist

This avoids paying for everything at once.

## Global Platform Design Principles

### Choose A Launch Market First

Do not build "global" compliance, payment, and onboarding complexity before proving one market.

Pick one:

- Nepal
- India
- UAE
- one African launch market
- one UK/US pilot

Then optimize:

- local language
- worker verification norms
- payout rails
- local labor workflow

### Separate Product Truth From Marketing Copy

Only claim features as real when backed by infrastructure.

Examples:

- "wallet available" is okay if there is a real ledger
- "OTP verification" is okay only if a verification provider is actually used
- "escrow protected" needs real payment state management and legal review

### Design For Trust Before Growth

Global labor marketplaces fail when trust systems are weak.

Prioritize:

- identity verification
- role-based permissions
- immutable event history
- moderation tools
- payout/risk review
- dispute evidence model

## Proposed Next Build Order

1. Replace local-only auth with real auth
2. Move jobs, applications, and chats to a real database
3. Add realtime status and chat
4. Add signed QR attendance
5. Add notification pipeline
6. Add marketplace payment orchestration
7. Add compliance/KYC workflows

## Official Sources Reviewed

- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Realtime: https://supabase.com/docs/guides/realtime
- Supabase Broadcast: https://supabase.com/docs/guides/realtime/broadcast
- Supabase Presence: https://supabase.com/docs/guides/realtime/presence
- Supabase usage and billing: https://supabase.com/docs/guides/platform/billing-on-supabase
- Stripe Connect overview: https://docs.stripe.com/connect
- Stripe marketplace guide: https://docs.stripe.com/connect/marketplace
- Stripe connected account identity verification: https://docs.stripe.com/connect/identity-verification
- Stripe hosted onboarding: https://docs.stripe.com/connect/connect-onboarding
- Twilio Verify docs: https://www.twilio.com/docs/verify/
- Twilio Verify pricing: https://www.twilio.com/en-us/verify/pricing
- Firebase Cloud Messaging docs: https://firebase.google.com/docs/cloud-messaging
- Firebase pricing: https://firebase.google.com/pricing
- Cloudflare Durable Objects: https://developers.cloudflare.com/durable-objects/
- Durable Objects WebSockets: https://developers.cloudflare.com/durable-objects/best-practices/websockets/
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Ably docs: https://ably.com/docs
- Ably pub/sub: https://ably.com/docs/pub-sub
- Vercel Queues: https://vercel.com/docs/queues
- Vercel functions pricing: https://vercel.com/docs/functions/usage-and-pricing/

## Bottom Line

The smartest path is not to build every "global" feature immediately.

The smartest path is:

- keep the current prototype cheap
- make the build and deployment process portable
- choose a single launch market
- add real auth, data, realtime, and payments in that order
- only expand to heavier multi-region infrastructure when real usage demands it
