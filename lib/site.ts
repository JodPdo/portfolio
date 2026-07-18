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

/**
 * Shared Open Graph / Twitter builder (PF-M3-07 + PF-M3-08).
 *
 * WHY THIS EXISTS: Next.js `Metadata` objects do NOT deep-merge across the
 * layout→page hierarchy. Any child route that declares its own `openGraph`
 * (or `twitter`) key REPLACES the parent's whole object rather than merging
 * into it — so a partial child override silently drops the root's OG image
 * (PF-M3-07: all 4 case studies lost `og:image`) and a page that declares NO
 * override at all inherits the root's `url: "/"`/home title verbatim
 * (PF-M3-08: /about, /contact, /resume, /projects showed the homepage's
 * og:title/description/url). The file-convention image in
 * `app/opengraph-image.tsx` is likewise only auto-attached to routes that do
 * not override `openGraph`, so any overriding route must re-declare it.
 *
 * FIX: every route (root layout, the 4 secondary pages, and the dynamic
 * case-study route) calls this one helper, which always returns a COMPLETE
 * `openGraph` + `twitter` pair — correct per-page title/description/url/type,
 * plus the shared OG image — so no route can ship a partial object that
 * clobbers the image or leaks the homepage's identity.
 */

/**
 * The root `app/opengraph-image.tsx` file-convention route. Referencing it
 * explicitly (rather than relying on auto-attachment) is what survives a child
 * `openGraph` override. `metadataBase` (root layout) resolves this to an
 * absolute URL in the rendered tags. Dimensions match the file's exported
 * `size` (1200×630, PNG).
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
} as const;

/**
 * Compose a full <title>/og:title string from a page segment, mirroring the
 * root `title.template` (`%s — Aekkarat Fontong`). Pass no segment for the
 * homepage, which uses the untemplated site title.
 */
export function formatTitle(segment?: string): string {
  return segment ? `${segment} — ${SITE_NAME}` : SITE_TITLE;
}

export type OpenGraphType = "website" | "article";

export interface BuildOpenGraphOptions {
  /** Full, already-composed OG/Twitter title (use `formatTitle`). */
  title: string;
  description: string;
  /** Root-relative path of THIS page, e.g. "/about" (resolved to absolute). */
  path: string;
  type?: OpenGraphType;
}

/**
 * Returns a complete `openGraph` + `twitter` block for one route. Spread the
 * result into a page's `metadata` export / `generateMetadata` return so every
 * route ships correct, self-describing social tags with the shared image.
 */
export function buildOpenGraph({
  title,
  description,
  path,
  type = "website",
}: BuildOpenGraphOptions) {
  return {
    openGraph: {
      type,
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
