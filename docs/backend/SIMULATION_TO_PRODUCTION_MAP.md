# Simulation To Production Map

## Current Simulated Areas

- OTP verification
- Voice onboarding
- Assisted onboarding state
- QR attendance
- Escrow and payment release
- Wallet ledger
- Push and SMS notifications
- Secure backend auth
- Realtime messaging transport

## Recommended Production Mapping

| Prototype Feature | Current State | Recommended First Real Version | Scale Version |
| --- | --- | --- | --- |
| OTP | UI-only feedback | Supabase Auth email OTP / magic link | Twilio Verify for phone-heavy regions |
| Voice onboarding | UI-only guide | assisted onboarding + translated flows | speech capture + voice agent |
| QR check-in | button click only | signed QR attendance API | rotating QR + geofence + proof checks |
| Escrow | local status toggle | Stripe Connect payment state machine | regional payout orchestration |
| Wallet | local number | backend ledger table | event-sourced ledger |
| Notifications | local array + toasts | FCM + email queue | multi-channel rules engine |
| Auth | local storage | Supabase Auth + backend session checks | dedicated identity service |
| Chat | local state sync | Supabase Realtime | Ably or Durable Objects |
| File uploads | local preview only | Supabase Storage | R2 + processing pipeline |

## Suggested Milestone Order

1. Real auth
2. Real database
3. Real chat and status updates
4. Real wallet and payment states
5. Real notifications
6. Real QR attendance
7. Voice onboarding expansion
