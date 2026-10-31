# Retiring the archived 2026 event Supabase backend

Status: **proposed retirement; no database backup or deletion has been performed**.
Review date: 2026-10-31. Tracking: [issue #70](https://github.com/emotigom/gomdori-event-support/issues/70).

## Preserve the right things

- **Source code and documentation:** This GitHub repository already preserves the static site, versioned Supabase SQL migrations, Edge Function source, history and QR configuration documentation. Git is **not** a backup of live Postgres rows, Auth users, uploaded Storage objects or dashboard-managed secrets.
- **Historical private data:** First determine whether the event organizer has a legal/business duty to retain any attendance, question, contact or answer records, the retention duration, and who may access them. If retention is not warranted, minimize or securely erase personal data rather than copying it into an indefinite archive.
- **If an authorized data archive is needed:** Take an authenticated logical/physical backup of the **original** project's database and separately export Storage files if any exist. An ordinary database backup does not contain the binary Storage objects. Preserve necessary Auth/configuration exports separately where permitted. Never export secrets to GitHub, this public repository, chat or issue comments.
- **Backup verification:** Keep the private, encrypted export in authorized storage, record the backup date, recovery method, file hash and a retention/deletion date. Verify the archive opens and contains the expected schema/record counts using a secure offline environment without exposing individual answers. Do not rely on a filename alone.

## Original project status is not yet verified

Historical Supabase project ref: `cwxxhzfppvkuqvmmhgiq` (display name `nextbridge-prod`).
On 2026-10-31 the owner's organization dashboard listed two **other** projects; it did not list this project. Connected project lookup returned a permissions error, and two public DNS resolvers returned NXDOMAIN. **That is not proof of deletion, or of an ordinary paused state.**

The owner received a Supabase warning email on 2026-08-24 saying this project might be automatically paused, but it was not yet paused on that date. No pause confirmation or deletion confirmation was found in the scoped email search.

[Current Supabase Project Pausing documentation](https://supabase.com/docs/guides/platform/free-project-pausing) now describes a **one-year** dashboard resume window after a Free project is actually paused. Older guidance referred to 90 days. The historical project's actual pause date, existence and applicable recovery option remain unknown.

1. Check the [original project dashboard](https://supabase.com/dashboard/project/cwxxhzfppvkuqvmmhgiq) while signed into the owning account and correct organization.
2. If the project still cannot be found, contact [Supabase support](https://supabase.com/dashboard/support/new) with the original project ref and organization, requesting its **status, access and backup/download or recovery options**. Do not include credentials or user records in the ticket.
3. If Supabase confirms a recoverable paused project, choose **download available backups** if supported, or resume only if necessary to export/verify records. Do not immediately reactivate the archived application's public backend or change the site to `published`.
4. If Supabase confirms the project is already deleted, record that as a confirmed fact. Do not claim a database snapshot exists merely because the application's SQL migrations are in GitHub.

## Before deleting anything

- [ ] Owner confirms exactly which project ref and organization are involved; neither currently active project in the dashboard is targeted.
- [ ] Retention obligations and permission to export or erase participant records have been reviewed.
- [ ] Required data, Storage objects and essential configuration were exported **outside GitHub**, or a documented decision was made not to retain sensitive records.
- [ ] If exported, encrypted backups were verified and a retention/deletion date was recorded in an access-controlled place.
- [ ] QR redirect remains available; pages have a truthful **static archived** message. If private answer status will not be supported, remove or disable the nonfunctional lookup/login UI through a separate reviewed frontend change.
- [ ] No remaining authorized users or integrations depend on the old Supabase endpoint.
- [ ] Only then, and only if the project still exists, the owner may delete the **exact original project** from Supabase Settings → General → Delete project and verify the confirmation identifies the correct project. This step is intentionally **not performed by this PR**.

Supabase's [deletion documentation](https://supabase.com/docs/guides/platform/delete-project) states that permanent deletion removes database rows, Auth, Storage, Edge Functions, configurations and backups. [Database backup documentation](https://supabase.com/docs/guides/platform/backups) notes that a database backup does **not** include Storage object contents.

## Preserve the public static archive

The GitHub Pages site and `https://go.gomdory.com/2026-sk` currently load over HTTPS. Keep these routes independent of whether the Supabase project can be recovered. Do not re-open new question submissions, rewrite historical commit references, or change cryptographic namespaces.

See [the DNS recovery investigation](archived-backend-dns-recovery.md) and [portfolio project tracking](https://github.com/emotigom/portfolio/issues/13).
