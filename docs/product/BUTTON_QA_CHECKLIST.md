# WorkShift Launch QA Matrix

Last updated: 2026-04-06

## Status Key

- `PASS`: verified by current code inspection and/or prior smoke coverage
- `DEMO-ONLY`: works in prototype mode but is not production-grade yet
- `LIVE-BACKEND REQUIRED`: needs real Supabase or payment/notification infrastructure to confirm properly
- `BLOCKED`: needs a fresh live-browser run, but current machine verification is blocked by the local Chrome crashpad/access-denied issue

## Verification Snapshot

- `npm run build`: passed
- current built bundle includes: expanded country list, larger worker-type catalog, dispute flow, upload flow, admin auth UI
- historical smoke coverage exists for most core worker/employer/admin/super-admin flows
- fresh browser verification on this machine is currently blocked by Chrome crashpad failure, so anything that needs a visible end-to-end rerun is marked `BLOCKED`

## Public Entry And Signup

| Area | Control / Flow | Status | Evidence / Note |
|---|---|---|---|
| Public CTA | `#heroWorker`, `#heroEmployer`, `#heroHome` | `PASS` | Routed by `actions.js` and previously covered by smoke |
| Public CTA | `[data-cta-role]` cards | `PASS` | Bound in `actions.js` and opens role-specific signup |
| Signup | `[data-signup-role]` | `PASS` | Changes signup role state |
| Signup | `[data-signup-employer-type]` | `PASS` | Switches business vs household hiring |
| Signup | `[data-signup-mode]` | `PASS` | Switches self / assisted / voice |
| Signup | `[data-step-action]` | `PASS` | Worker guided-step shortcuts wired |
| Signup | `#sendOtp` | `PASS` | Requests demo or Supabase OTP path |
| Signup | `#signupForm` | `PASS` | Creates worker/employer/household account in demo flow |
| Login | `#loginForm` and `[data-login-role]` | `PASS` | Restores local role-based portal |
| Signup | dynamic country list | `PASS` | Now driven from `country-rules.js` |
| Signup | dynamic worker-type list | `PASS` | Now driven from `data.js` worker catalog |
| Signup | live OTP completion UX | `LIVE-BACKEND REQUIRED` | Needs real Supabase project/session |
| Signup | visible clickthrough rerun after latest patch | `BLOCKED` | Machine browser issue, not known app JS failure |

## Worker Portal

| Area | Control / Flow | Status | Evidence / Note |
|---|---|---|---|
| Jobs | `[data-worker-jobs-filter]` | `PASS` | Changes discover/applied/saved/active/completed |
| Jobs | `[data-worker-job-search-apply]` | `PASS` | Search term/location/country filter wired |
| Jobs | `[data-worker-job-search-clear]` | `PASS` | Clears filter state |
| Jobs | `[data-worker-location-chip]` | `PASS` | Applies location chips |
| Jobs | `[data-select-worker-job]` | `PASS` | Selects active job and thread |
| Job modal | `[data-worker-open-job]`, `[data-worker-close-job]` | `PASS` | Modal flow implemented |
| Apply | `[data-worker-apply]`, `[data-worker-quick-apply]` | `PASS` | Historical smoke coverage exists |
| Save | `[data-worker-save]` | `PASS` | Local job save toggle implemented |
| Chat | `[data-worker-send-chat]` | `PASS` | Demo/local plus Supabase path exists |
| Discovery | `[data-worker-map-toggle]` | `PASS` | Map/list toggle wired |
| Profile | `[data-worker-toggle-availability]` | `PASS` | Availability toggle wired |
| Shift | `[data-worker-checkin]` | `DEMO-ONLY` | Local state only |
| Shift | `[data-worker-proof]` | `DEMO-ONLY` | Local state only |
| Wallet | `[data-worker-withdraw]` | `DEMO-ONLY` | Not tied to real payout rail yet |
| Upload | `[data-preview-upload='worker-photo']` | `PASS` | Upload path and preview logic wired |
| Upload | `[data-document-file-upload='worker:*']` | `PASS` | Real file upload path wired |
| Disputes | `[data-open-dispute]`, `[data-close-dispute]`, `[data-submit-dispute]` | `PASS` | Composer and submission path implemented |
| Worker live sync | realtime applications/chat/status | `LIVE-BACKEND REQUIRED` | Needs real Supabase config to verify end to end |
| Worker portal rerun in browser | full latest visible pass | `BLOCKED` | Chrome crashpad issue |

## Employer Portal

| Area | Control / Flow | Status | Evidence / Note |
|---|---|---|---|
| Jobs | `[data-open-job-modal]`, `[data-edit-job]`, `[data-job-modal-next]`, `[data-job-modal-back]`, `[data-job-modal-cancel]`, `[data-save-job-post]` | `PASS` | Wizard flow implemented and smoke-covered earlier |
| Jobs | `[data-delete-job]` | `PASS` | Local delete flow wired |
| Jobs | `[data-select-employer-job]` | `PASS` | Selection flow wired |
| Applicants | `[data-select-applicant]` | `PASS` | Selection flow wired |
| Pipeline | `[data-shortlist]`, `[data-invite]`, `[data-hire-worker]`, `[data-rate-worker]` | `PASS` | Historical smoke coverage exists |
| Escrow | `[data-escrow]`, `[data-release-escrow]` | `PASS` | Demo and Supabase path both wired |
| Chat | `[data-employer-send-chat]` | `PASS` | Demo/local plus Supabase sync path |
| Search | `[data-employer-map-toggle]` | `PASS` | Toggle wired |
| Search | `[data-employer-search-skill]`, `[data-employer-search-location]`, `[data-search-location-chip]`, `[data-clear-search]` | `PASS` | Search controls wired |
| Search | `[data-save-search]`, `[data-apply-saved-search]`, `[data-remove-saved-search]` | `PASS` | Saved-search flow wired |
| Search | `[data-worker-filter]`, `[data-sort-workers]` | `PASS` | Quick filter and sort wired |
| Search | `[data-select-search-worker]`, `[data-open-worker-profile]`, `[data-close-worker-profile]` | `PASS` | Search profile flow wired |
| Search outreach | `[data-search-worker-chat]`, `[data-invite-search-worker]`, `[data-shortlist-search-worker]` | `PASS` | Outreach actions wired |
| Wage tools | `[data-raise-bid]` | `PASS` | Bid raise flow implemented |
| Lifecycle | `[data-pause-job]`, `[data-reopen-job]`, `[data-cancel-job]` | `PASS` | Job lifecycle controls wired |
| Upload | `[data-preview-upload='employer-logo']` | `PASS` | Upload path and preview logic wired |
| Upload | `[data-document-file-upload='employer:*']` | `PASS` | Employer/household doc upload path wired |
| Disputes | `[data-open-dispute]`, `[data-close-dispute]`, `[data-submit-dispute]` | `PASS` | Dispute composer wired |
| Employer live pipeline | shortlist/invite/hire/chat across realtime backend | `LIVE-BACKEND REQUIRED` | Needs real Supabase project |
| Employer portal rerun in browser | full latest visible pass | `BLOCKED` | Chrome crashpad issue |

## Household / Hire For Home Portal

| Area | Control / Flow | Status | Evidence / Note |
|---|---|---|---|
| Onboarding | household signup path | `PASS` | Separate account type and dashboard wired |
| Booking board | home request wizard and booking cards | `PASS` | Shared wizard adapts for household mode |
| Helpers | shortlist/invite/book helper flow | `PASS` | Uses employer action layer |
| Payment safety | escrow/release flow | `PASS` | Same employer-side action path |
| Upload | household verification docs | `PASS` | Same document upload path |
| Disputes | home-service dispute creation | `PASS` | Same dispute composer path |
| Household live backend | real bookings/disputes/uploads in Supabase | `LIVE-BACKEND REQUIRED` | Needs real config and data |
| Household visible rerun | fresh browser confirmation | `BLOCKED` | Chrome crashpad issue |

## Admin Portal

| Area | Control / Flow | Status | Evidence / Note |
|---|---|---|---|
| Access | `Ctrl+Shift+A` | `PASS` | Opens secure admin modal |
| Auth modal | `[data-auth-role='admin']` | `PASS` | Auth role switching wired |
| Auth modal | `#authSubmit` | `PASS` | Demo code path and live-session path both wired |
| Auth modal | `#authRequestOtp` | `PASS` | Live admin OTP request path wired |
| Queue | `[data-select-queue]` | `PASS` | Queue selection wired |
| Queue | `[data-approve]`, `[data-rerequest]`, `[data-suspend]` | `PASS` | Action handlers implemented |
| Disputes | `[data-select-dispute]` | `PASS` | Dispute selection wired |
| Disputes | `[data-resolve]`, `[data-refund]` | `PASS` | Action handlers implemented |
| Admin live role auth | OTP and live role validation | `LIVE-BACKEND REQUIRED` | Needs real Supabase admin/super-admin profiles |
| Admin live queue/dispute hydration | `LIVE-BACKEND REQUIRED` | Needs real backend data |
| Admin visible rerun | fresh browser confirmation | `BLOCKED` | Chrome crashpad issue |

## Super Admin Portal

| Area | Control / Flow | Status | Evidence / Note |
|---|---|---|---|
| Access | `Ctrl+Shift+S` | `PASS` | Opens secure super-admin modal |
| Auth modal | `[data-auth-role='super_admin']` | `PASS` | Role switching wired |
| Controls | `[data-super-save-settings]` | `DEMO-ONLY` | UX action exists, not production config backend |
| Controls | `[data-super-toggle-flag]` | `DEMO-ONLY` | Local/demo feature flag toggle |
| Controls | `[data-super-add-admin]`, `[data-remove-admin]` | `DEMO-ONLY` | Demo/local admin management, not full IAM |
| Live super-admin session | `LIVE-BACKEND REQUIRED` | Needs real Supabase super-admin profile |
| Visible rerun | `BLOCKED` | Chrome crashpad issue |

## Uploads And Evidence

| Area | Flow | Status | Evidence / Note |
|---|---|---|---|
| Worker docs | verification uploads | `PASS` | UI and handler wired |
| Employer docs | verification uploads | `PASS` | UI and handler wired |
| Household docs | verification uploads | `PASS` | Uses same upload handler |
| Dispute evidence | notes/links | `PASS` | Stored in dispute draft and records |
| Dispute evidence | file attachments | `PASS` | Upload handler and storage path wired |
| Supabase Storage | `workshift-documents`, `workshift-evidence` | `PASS` | Schema includes bucket/policy setup |
| Real bucket behavior | file read/write/public URL behavior | `LIVE-BACKEND REQUIRED` | Needs actual Supabase storage test |
| Browser upload UX rerun | file chooser, rerender, preview | `BLOCKED` | Machine browser issue |

## Payments, Notifications, And Launch Hardening

| Area | Flow | Status | Evidence / Note |
|---|---|---|---|
| Escrow ledger structure | fund/release/refund/dispute data model | `PASS` | Wired in code and schema |
| Payment webhooks | provider reconciliation | `LIVE-BACKEND REQUIRED` | Not implemented yet |
| Refund orchestration | production-grade state machine | `LIVE-BACKEND REQUIRED` | Still needs hardening |
| SMS / Email / Push notifications | `LIVE-BACKEND REQUIRED` | Not fully implemented yet |
| Country-by-country compliance rollout | `LIVE-BACKEND REQUIRED` | Product model exists, operations not complete |
| Responsive/device/browser launch QA | `BLOCKED` | Needs visible browser/device pass |

## Recommended Manual QA Order

1. Public worker signup, employer signup, and household signup
2. Worker search, apply, chat, upload, and dispute
3. Employer post job, search workers, shortlist, invite, hire, escrow, release, and dispute
4. Household booking, helper selection, payment, and dispute
5. Admin verification and dispute resolution
6. Super-admin access and admin management
7. Live Supabase retest with real auth, storage, dispute, and payment paths
8. Final mobile and responsive QA

## Bottom Line

- The platform is not “missing lots of buttons”; most controls now have real handlers behind them.
- The main risk has shifted from missing UI wiring to live-environment confirmation and production-grade backend completion.
- This matrix should be treated as the working launch checklist until a fresh manual browser QA pass is completed on a machine without the current Chrome crashpad issue.
