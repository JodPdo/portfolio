/**
 * Single source of truth for site-wide identity + SEO constants.
 *
 * Canonical base URL: the production domain is already locked in CLAUDE.md
 * ("Domain: jod.aiklaotrip.com") / docs/SPEC.md §Domain. The actual DNS/CNAME
 * wiring lands later in PF-M3-03; until then this constant is the canonical
 * URL every metadata/sitemap/robots entry resolves against (`metadataBase`,
 * canonical alternates, JSON-LD `url`). It is intentionally a plain constant,
 * not an env var — there is no existing env-var convention in this repo and
 * introducing one would be a config decision for the architect. A hardcoded
 * canonical is the idiomatic Next choice: preview deployments should still
 * point their canonical/OG tags at the production origin.
 */
export const SITE_URL = "https://jod.aiklaotrip.com";

/** Owner identity (docs/SPEC.md — Aekkarat Fontong "Jod"). */
export const PERSON_NAME = "Aekkarat Fontong";
export const PERSON_NICKNAME = "Jod";
export const JOB_TITLE = "Software / QA Automation Engineer";

/** Short, shared with root <title> default and default meta/OG description. */
export const SITE_NAME = PERSON_NAME;
export const SITE_TITLE = `${PERSON_NAME} — ${JOB_TITLE}`;
export const SITE_DESCRIPTION =
  "Portfolio of Aekkarat Fontong (Jod), Software / QA Automation Engineer — " +
  "a Royal Thai Police career-changer who ships production software and the " +
  "automated tests that keep it honest.";

/**
 * Public profile links — must match the handles already shipped in
 * components/sections/footer.tsx and app/contact/page.tsx (verified in
 * docs/SPEC.md §4.4). Used for JSON-LD `Person.sameAs`. No phone or email in
 * structured data (CLAUDE.md decision #1; email stays on /contact only).
 */
export const GITHUB_URL = "https://github.com/JodPdo";
export const LINKEDIN_URL = "https://www.linkedin.com/in/aekkarut-fontong";
