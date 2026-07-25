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
 *   - jpd-api: poster only — the PO supplied a real "JPD API FLOW (Backend)"
 *     architecture diagram, so it LEFT the typographic-panel-only state it held
 *     from 2026-07-20 (architect ruling 2026-07-25, DESIGN_SYSTEM.md decision
 *     log). Same move Tiger Kick made: a real static image stands in for a clip
 *     that will never exist (an API has nothing to film). Data + comments only —
 *     no type, component, or rendering-path change.
 *
 * No project currently occupies the "no entry" state. It stays supported as the
 * designed fallback for any future project shipped without media, and BasePanel
 * is still always rendered as the base layer under every video/img.
 *
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
  "jpd-api": { poster: "/media/jpd-api-preview.webp" }, // NO src — image-only preview (architect-approved 2026-07-25)
};

export function getProjectPreview(
  slug: string,
): { src?: string; poster?: string } | undefined {
  return PROJECT_PREVIEWS[slug];
}
