import Link from "next/link";
import type { Project } from "@/lib/projects";

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm px-1 py-0.5 text-xs font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Renderer contract (ARCHITECTURE.md §3, Ruling 2026-07-06): emit an
 * external link only for a `links` key that is present and non-empty.
 * An absent key renders nothing — never an empty/placeholder href.
 *
 * The card's own case-study link lives on the title (`<h3><Link>`), so
 * these external links are siblings, not nested inside another `<a>`.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, tagline, summary, stack, metrics, links } = project;

  const externalLinks: { key: string; href: string; label: string }[] = [];
  if (links?.live) {
    externalLinks.push({ key: "live", href: links.live, label: "Live" });
  }
  if (links?.apk) {
    externalLinks.push({ key: "apk", href: links.apk, label: "APK" });
  }
  if (links?.docs) {
    externalLinks.push({ key: "docs", href: links.docs, label: "Docs" });
  }
  if (links?.repos) {
    for (const repo of links.repos) {
      if (repo?.url && repo?.label) {
        externalLinks.push({
          key: `repo-${repo.label}`,
          href: repo.url,
          label: repo.label,
        });
      }
    }
  }

  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-border bg-background-subtle p-6 transition-colors duration-200 hover:border-primary motion-reduce:transition-none">
      <h3 className="text-lg font-semibold text-foreground">
        <Link
          href={`/projects/${slug}`}
          className="rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          {title}
        </Link>
      </h3>

      {tagline ? (
        <p className="text-sm font-medium text-primary">{tagline}</p>
      ) : null}

      <p className="text-sm leading-relaxed text-foreground">{summary}</p>

      {metrics && metrics.length > 0 ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground">
          {metrics.map((metric) => (
            <li key={metric.label}>
              <span className="font-mono font-semibold text-primary">
                {metric.value}
              </span>{" "}
              {metric.label}
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {stack.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>

      {externalLinks.length > 0 ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          {externalLinks.map((link) => (
            <li key={link.key}>
              <ExternalLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
