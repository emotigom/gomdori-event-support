# Archived 2026 event — backend DNS recovery and data preservation

**Observed:** 2026-10-31. **Status:** read-only investigation; external owner action required.

## What is confirmed

- The public QR routes for `https://go.gomdory.com/2026-sk` (with and without slash) reach the renamed `https://emotigom.github.io/gomdori-event-support/` site with HTTP 200 and valid TLS. [Run 41179159064](https://github.com/emotigom/gomdori-event-support/actions/runs/41179159064).
- The project GitHub Pages static site and `/admin/` page both return HTTP 200. **This does not mean that operator login or answer lookup is functional.**
- The current deployed front end is configured to use Supabase project host `cwxxhzfppvkuqvmmhgiq.supabase.co` for Auth/Edge Functions. A request to `question-status` could not begin because DNS lookup failed. [Preflight run 41180647076](https://github.com/emotigom/gomdori-event-support/actions/runs/41180647076).
- Google DNS and Cloudflare DNS-over-HTTPS independently return `Status: 3` (NXDOMAIN) for that exact host. The same runner resolves `supabase.co` and `google.com`. [Cross-check run 41180687037](https://github.com/emotigom/gomdori-event-support/actions/runs/41180687037).
- The connected Supabase account does not list the historical `nextbridge-prod` project. **This does not prove deletion or loss of participant data.** The live backend's current project status is unknown.

Historical project-related names have separate meanings:

| Name | Role |
| --- | --- |
| `cwxxhzfppvkuqvmmhgiq` | Supabase project **ref** in previously configured public API URL |
| `nextbridge-prod` | Historical Supabase dashboard project display name |
| `nextbridge-event-support` | The old Supabase CLI `supabase/config.toml` local project ID |
| `gomdori-event-support` | Renamed **GitHub** repository / GitHub Pages project name |

Do not confuse the CLI identifier, dashboard name, and actual Supabase project ref. Do not assume renaming GitHub changed any hosted Supabase identity.

## Owner-side checks (read-only first)

1. Open the Supabase dashboard, use **Switch organization** as needed, and find the original project by **project ref** `cwxxhzfppvkuqvmmhgiq` or historical display name `nextbridge-prod`. The currently connected Supabase account does not show the original event project; do not disclose unrelated project names.
2. Check whether the project is active, paused, inaccessible due to organization ownership, transferred, or has been removed. If a project is missing, check with other authorized historical accounts and Supabase support. Record the status and retention or recovery options without posting login details.
3. Check backups and recovery eligibility **before** taking restore, delete, or create actions. If original question rows and user accounts are recoverable, preserve exact `event_slug`, `receipt_code`, `private_token_hash`, Auth identities, timestamps and policy migrations. Do not initialize a new empty database as though it preserved old answers.
4. If the **original** host returns again, confirm the archived event remains disabled for new intake (historically front-end `status: archived`, database `is_active = false`). Check SQL/RLS permissions, service role use only on server, Edge Functions `question-status` and `admin-questions`, origin allowlist, Turnstile settings and Auth allowed redirect `https://emotigom.github.io/gomdori-event-support/admin/`.
5. Re-test DNS resolution, allowed-origin `OPTIONS` preflight (**expected 204**) and disallowed-origin preflight (**expected 403**). Only then should the authorized owner privately test a known historical receipt and operator sign-in; **do not** paste receipt codes, private URLs, private answer text or credentials into GitHub issues.
6. If the original service cannot be restored, document that limitation and any legal/retention decisions separately. The static event website and QR destination should remain available, but do not promise that historical private lookup works.

## Safe public validation vs unsafe shortcuts

Safe read-only tests: public DNS queries, HTTPS static route checks, cross-origin **OPTIONS** preflight after DNS recovery, and verified callback configuration checks performed by the owner in their own dashboard.

Avoid: posting or searching user receipts; attempting unauthorized record queries; resetting RLS; copying production user data into a public repo; publishing a secret or service-role token; guessing the original project contents; modifying private-token prefixes; or reactivating anonymous question intake.

## Recovery dependencies

- [Tracking issue #70](https://github.com/emotigom/gomdori-event-support/issues/70)
- [Portfolio migration tracking #13](https://github.com/emotigom/portfolio/issues/13)
- [Historical external setup](external-setup.md)
- [QR cutover details](qr-cutover.md)

**The outstanding decision is project ownership/recovery, not a QR or GitHub repository routing change.**
