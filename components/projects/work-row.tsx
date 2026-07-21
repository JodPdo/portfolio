import { ProjectMediaRow } from "./project-media-row";

/**
 * WorkRow — thin adapter over <ProjectMediaRow> for the `/projects` route
 * (architect ruling 2026-07-22, "Option B: side framed thumbnail", which
 * supersedes the 2026-07-21 "Option A" full-bleed design). All the shared
 * framed-thumbnail + in-view autoplay machinery lives in ProjectMediaRow; this
 * file only keeps the `WorkRowProject` interface and maps a project's fields
 * onto the row, passing tagline + summary + stack as the secondary `children`
 * (always visible in Option B — text never sits over media, so nothing
 * collapses).
 *
 * The two-optional-fields preview model is unchanged (see project-previews.ts /
 * project-media-row.tsx): `previewSrc` (+ optional poster) ⇒ video; `previewPoster`
 * only ⇒ image; neither ⇒ typographic base panel (e.g. JPD API).
 */

export interface WorkRowProject {
  slug: string;
  title: string;
  /** One-line descriptor (frontmatter `tagline`). */
  tagline?: string;
  summary: string;
  stack: string[];
  /** Muted-looping webm preview; autoplays in view. See project-media-row.tsx. */
  previewSrc?: string;
  /** Real still (webp): the <video> poster when `previewSrc` is set, else the image-only preview. */
  previewPoster?: string;
}

export function WorkRow({
  project,
  index,
}: {
  project: WorkRowProject;
  index: number;
}) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <ProjectMediaRow
      href={`/projects/${project.slug}`}
      title={project.title}
      ordinal={ordinal}
      previewSrc={project.previewSrc}
      previewPoster={project.previewPoster}
      headingLevel="h2"
    >
      {project.tagline ? (
        <p className="text-sm font-medium leading-relaxed text-primary">
          {project.tagline}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
        {project.summary}
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
        {project.stack.map((item) => (
          <li
            key={item}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-secondary"
          >
            {item}
          </li>
        ))}
      </ul>
    </ProjectMediaRow>
  );
}
