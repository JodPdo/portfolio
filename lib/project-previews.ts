/**
 * Per-project preview assets — SINGLE SOURCE OF TRUTH, keyed by slug.
 *
 * Moved out of `app/projects/page.tsx` (architect ruling 2026-07-21, Option A)
 * so BOTH routes that render project rows — `/projects` (WorkRow) and the home
 * `01 — Featured projects` section — import the same map. One map, both routes.
 *
 * MEDIA DROPPED 2026-07-20; real assets live in `public/media/`. Each entry maps
 * to one of ProjectMediaRow's three preview states (content model unchanged and
 * reaffirmed by the 2026-07-21 ruling — this file changes location, not shape):
 *
 *   { src, poster } => video preview (poster is the <video>'s `poster` attr,
 *                      shown before the clip loads / when paused).
 *   { poster }      => image-only preview: a plain <img> (no <video>, no
 *                      autoplay) — used when a clip doesn't exist yet.
 *   (no entry)      => typographic base panel only (the designed dark mat).
 *
 * State per project:
 *   - aiklao / typing-race: video + poster (real webm clips exist).
 *   - tiger-kick: poster only — the game is unfinished, so a still stands in.
 *   - jpd-api: intentionally ABSENT — stays typographic-base-panel-only.
 * All referenced files exist on disk, so nothing 404s.
 */
export const PROJECT_PREVIEWS: Record<
  string,
  { src?: string; poster?: string } | undefined
> = {
  aiklao: {
    src: "/media/aiklao-preview.webm",
    poster: "/media/aiklao-preview.webp",
  },
  "typing-race": {
    src: "/media/typing-race-preview.webm",
    poster: "/media/typing-race-preview.webp",
  },
  "tiger-kick": { poster: "/media/tiger-kick-preview.webp" }, // NO src — image-only, game unfinished
  // jpd-api: intentionally absent — stays typographic-base-panel-only.
};

export function getProjectPreview(
  slug: string,
): { src?: string; poster?: string } | undefined {
  return PROJECT_PREVIEWS[slug];
}
