# WorkShift Task Checklist

This checklist captures the repeated requirements, visible failures, and core flows that must be completed properly before calling the project done.

## Ground Rules

- Do not mark a feature complete just because code exists.
- Do not mark a feature complete just because a smoke test passes.
- A feature is complete only when it is visible, usable, and understandable in the browser.
- Admin features must stay hidden from public users.
- Worker and employer journeys must feel like a real product, not a demo.

## Top Priority Core Flow

This is the minimum end-to-end product flow that must work visibly:

1. Worker registers.
2. Worker logs in.
3. Admin approves worker.
4. Employer registers.
5. Employer logs in.
6. Employer posts a real job.
7. Worker sees that employer job.
8. Worker applies to that employer job.
9. Employer sees that exact worker as applicant.
10. Employer chats with that worker.
11. Worker sees that employer reply.
12. Employer shortlists, invites, or hires that worker.
13. Worker sees updated status in the dashboard.
14. Approval, chat, and status remain visible after logout/login.

## Landing Page Requirements

- Read and follow the blueprint properly.
- Landing page must not feel AI-generic.
- Add premium visual direction with motion and 3D depth.
- Use worker-related visuals that reflect real work environments.
- Keep the page clean and avoid internal/admin-looking content.
- Remove filler sections that were not requested.
- Make all visible CTA buttons work.
- Ensure the page works well on desktop and mobile.

## Public User Requirements

- Worker registration must be visible and easy to find.
- Employer registration must be visible and easy to find.
- Worker login must be visible and usable.
- Employer login must be visible and usable.
- Public buttons must take users to the correct destination.
- Images used in onboarding and role entry sections must display properly.

## Worker Portal Requirements

- Worker can view all available jobs.
- Worker can open job details.
- Worker can apply to a job.
- Worker can save a job.
- Worker can toggle availability.
- Worker can upload profile photo.
- Worker can upload required verification documents.
- Worker can edit profile.
- Worker can view wallet and withdraw.
- Worker can see application state:
  - Applied
  - Shortlisted
  - Invited
  - Hired
  - Rated
- Worker can chat with employer in a visible conversation area.
- Worker can see employer replies after employer action.
- Worker ID and approval state must show after admin approval.

## Employer Portal Requirements

- Employer can create account and log in.
- Employer can edit company profile.
- Employer can upload company logo.
- Employer can upload required business verification documents.
- Employer can post a job using a clear job flow.
- Employer can edit a job.
- Employer can delete a job.
- Employer can pause a job.
- Employer can reopen a job.
- Employer can cancel a job.
- Employer can see applicants for a job.
- Employer can shortlist applicants.
- Employer can invite applicants.
- Employer can hire applicants.
- Employer can chat with selected applicant.
- Employer can see that the applicant thread is tied to the real worker.
- Employer can raise wages by bidding.
- Employer can search/filter workers.
- Employer can use map/list discovery view.
- Employer can fund escrow and release escrow.
- Employer analytics must be visible and understandable.

## Admin Requirements

- Admin access must not be visible to public users.
- Admin access must require authorization.
- Admin can approve worker accounts.
- Admin can approve employer accounts.
- Admin approval must persist.
- Approved users must see approval state later when logging in again.
- Admin can request re-upload.
- Admin can suspend accounts.

## Super Admin Requirements

- Super admin access must stay hidden from public users.
- Super admin can add admin accounts.
- Super admin can remove admin accounts.
- Super admin settings and flag changes must persist.

## AI Matching and Hiring Requirements

- AI worker-job matching must be visible in employer flow.
- Employer must be able to see ranked workers.
- Matching should not just exist in code; it must be understandable on screen.
- Hiring pipeline should be visible:
  - New
  - Shortlisted
  - Invited
  - Hired
  - Rated

## Chat Requirements

- Worker-to-employer chat must be visible.
- Employer-to-worker chat must be visible.
- The conversation must reflect the exact worker and employer involved.
- Messages sent by employer should appear for worker.
- Messages sent by worker should appear for employer.
- Chat must not feel like a fake generic feed.

## Approval and Identity Requirements

- After worker registration and approval, worker dashboard should show worker ID.
- After employer registration and approval, employer dashboard should show employer ID.
- Approval state should remain after reload and later login.

## QA Checklist

Before saying the project is complete, verify all of these in the browser:

- Landing page loads without script/startup error.
- Images display correctly.
- Public registration buttons work.
- Public login buttons work.
- Worker portal opens after worker registration/login.
- Employer portal opens after employer registration/login.
- Admin portal opens only after authorization.
- Super admin portal opens only after authorization.
- Worker apply flow works on a real employer-created job.
- Employer sees the real applicant.
- Employer chat works with selected applicant.
- Worker sees mirrored employer reply.
- Employer hire flow updates worker status.
- Wage bidding button works visibly.
- Escrow buttons work visibly.
- Edit/delete/pause/reopen/cancel job actions work visibly.
- Profile save works for worker.
- Profile save works for employer.
- Document upload actions work for worker.
- Document upload actions work for employer.
- Approval state remains visible after logout/login.

## Known Review Standard

The project should be judged by what a real user sees and experiences, not by hidden code paths.
