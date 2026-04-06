# WorkShift Manual Test Sheet

Last updated: 2026-04-06

Use this as the short click-by-click test run for the current app.

Status key:
- `Core`: should work in the current demo build
- `Demo-only`: works as prototype behavior, not production infrastructure
- `Live backend`: needs real Supabase or payment/notification services to fully confirm
- `Blocked here`: not re-runnable on this machine right now because local Chrome headless is failing

## Before You Start

1. Open [index.html](/c:/Users/Administrator/Desktop/Workshift/index.html).
2. Keep this sheet open beside the app.
3. If you want live backend checks, configure Supabase first from [SUPABASE_SETUP.md](/c:/Users/Administrator/Desktop/Workshift/docs/backend/SUPABASE_SETUP.md).

## Pass 1: Public Entry And Signup

1. Click `Find Work`.
Expected: worker signup opens.
Status: `Core`

2. Click `Hire Staff`.
Expected: employer signup opens.
Status: `Core`

3. Click `Hire For Home`.
Expected: household signup opens.
Status: `Core`

4. In signup, change role tabs.
Expected: form fields update for worker, employer, and household paths.
Status: `Core`

5. In worker signup, check the country dropdown.
Expected: expanded country list is visible.
Status: `Core`

6. In worker signup, check the worker skill list.
Expected: large worker-type catalog is visible.
Status: `Core`

7. Click `Send OTP`.
Expected: demo success or Supabase OTP request path starts.
Status: `Core`, `Live backend` for real OTP delivery

8. Submit signup for a worker, an employer, and a household user.
Expected: each path creates the correct portal account.
Status: `Core`

9. Test login form with each role.
Expected: correct portal opens for that role.
Status: `Core`

## Pass 2: Worker Flow

1. Open worker portal and switch job filters.
Expected: discover, applied, saved, active, and completed sections change.
Status: `Core`

2. Search by keyword, location, and country.
Expected: job list filters correctly.
Status: `Core`

3. Clear search.
Expected: filters reset.
Status: `Core`

4. Open a job card.
Expected: job detail modal opens.
Status: `Core`

5. Apply to a job.
Expected: job moves into worker-applied flow and thread becomes available.
Status: `Core`

6. Save and unsave a job.
Expected: saved state toggles.
Status: `Core`

7. Send a worker chat message.
Expected: message appears in thread.
Status: `Core`, `Live backend` for realtime persistence

8. Upload worker photo and at least one verification document.
Expected: preview/document state updates.
Status: `Core`, `Live backend` for real storage confirmation

9. Open a dispute and submit notes or file evidence.
Expected: dispute is created and visible in worker-side history.
Status: `Core`, `Live backend` for true storage/backend verification

10. Try check-in, proof of work, and withdraw.
Expected: buttons respond, but these are still not full production workflows.
Status: `Demo-only`

## Pass 3: Employer Flow

1. Open employer portal and create a job.
Expected: job wizard completes and saves a posting.
Status: `Core`

2. Edit the job and save again.
Expected: job updates.
Status: `Core`

3. Search workers by skill and location.
Expected: results and quick filters respond.
Status: `Core`

4. Open a worker profile from search.
Expected: profile modal opens and closes correctly.
Status: `Core`

5. Shortlist, invite, and hire a worker.
Expected: applicant status updates through the pipeline.
Status: `Core`, `Live backend` for cross-session realtime confirmation

6. Send an employer chat message.
Expected: message appears in employer thread.
Status: `Core`, `Live backend` for realtime persistence

7. Fund escrow, then release escrow.
Expected: payment state updates in the dashboard.
Status: `Core`, `Live backend` for real money movement

8. Pause, reopen, and cancel a job.
Expected: lifecycle badges and actions update.
Status: `Core`

9. Upload employer logo and documents.
Expected: preview/document state updates.
Status: `Core`, `Live backend` for real storage confirmation

10. Open an employer dispute.
Expected: dispute appears in employer-side history and admin queue path.
Status: `Core`, `Live backend`

## Pass 4: Hire For Home Flow

1. Open household portal.
Expected: dedicated household dashboard appears instead of business employer board.
Status: `Core`

2. Create a home-service request.
Expected: household booking wizard saves plumber, electrician, nanny, cleaner, or similar booking.
Status: `Core`

3. Shortlist or invite a helper.
Expected: helper pipeline updates.
Status: `Core`

4. Fund and release payment.
Expected: booking payment state updates.
Status: `Core`, `Live backend` for real payment handling

5. Upload household verification docs.
Expected: document status updates.
Status: `Core`, `Live backend`

6. Open a household dispute.
Expected: dispute enters the shared dispute flow.
Status: `Core`, `Live backend`

## Pass 5: Admin And Super Admin

1. Press `Ctrl+Shift+A`.
Expected: admin access modal opens.
Status: `Core`

2. Test admin auth.
Expected: demo code path works now; real OTP/session path requires live backend.
Status: `Core`, `Live backend`

3. Review a verification queue item.
Expected: queue selection works.
Status: `Core`

4. Approve, re-request, and suspend a queue item.
Expected: review action updates state.
Status: `Core`, `Live backend` for true backend audit flow

5. Select a dispute.
Expected: dispute detail opens.
Status: `Core`

6. Resolve and refund a dispute.
Expected: dispute/payment state updates.
Status: `Core`, `Live backend` for real financial orchestration

7. Press `Ctrl+Shift+S`.
Expected: super-admin access modal opens.
Status: `Core`

8. Test super-admin settings, feature flags, and admin management.
Expected: controls respond, but these remain prototype-grade.
Status: `Demo-only`

## Pass 6: Live Backend Confirmation

Run this only after Supabase is configured.

1. Sign in with live OTP/session flow.
Expected: session persists after refresh.
Status: `Live backend`

2. Confirm worker and employer chat sync across two sessions.
Expected: messages appear without reload.
Status: `Live backend`

3. Confirm worker status changes after employer shortlist, invite, and hire.
Expected: worker portal updates without full hydration refresh.
Status: `Live backend`

4. Confirm uploaded docs and dispute files open from Supabase Storage URLs.
Expected: files are stored and retrievable.
Status: `Live backend`

5. Confirm admin queue and disputes load from real backend data.
Expected: admin sees live records, not just demo state.
Status: `Live backend`

## Known Blocker On This Machine

- Fresh full browser rerun is still `Blocked here` because local Chrome headless is failing with a Windows crashpad/access-denied error.
- This does not currently indicate a known JavaScript build failure.

## Quick Result Summary

Mark your own run like this:

- Public/signup: `Pass` / `Issue`
- Worker flow: `Pass` / `Issue`
- Employer flow: `Pass` / `Issue`
- Household flow: `Pass` / `Issue`
- Admin flow: `Pass` / `Issue`
- Live backend checks: `Pass` / `Issue` / `Not run`

For the full matrix and status detail, use [BUTTON_QA_CHECKLIST.md](/c:/Users/Administrator/Desktop/Workshift/docs/product/BUTTON_QA_CHECKLIST.md).
