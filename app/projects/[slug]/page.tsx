import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getProjectBySlug,
  getProjectSlugs,
  type Project,
} from "@/lib/projects";
import { mdxComponents } from "@/components/mdx/mdx-components";

// The 4 slugs are fixed and come from content/projects/*.mdx filenames
// (docs/ARCHITECTURE.md §1). Exactly 4 pages are prerendered; any other slug
// returns the global 404 — no ISR, no fallback.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const canonical = `/projects/${project.slug}`;

  // Bare page segment — the root `title.template` appends "— Aekkarat Fontong".
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: canonical,
    },
  };
}

const LABEL_CLASSES =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary";

const CTA_LINK_CLASSES =
  "inline-flex items-center gap-1.5 rounded-sm font-mono text-xs uppercase tracking-[0.16em] text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

/**
 * Flatten frontmatter `links` into an ordered, render-ready list. Renderer
 * contract (ARCHITECTURE.md §3, Ruling 2026-07-06): emit a link ONLY for a
 * key that is present and non-empty — absent key renders nothing, never a
 * placeholder/`#` href. Unverified URLs live in the MDX body as plain-text
 * tracking notes and never reach frontmatter, so this list is always safe.
 */
function resolveLinks(links: Project["links"]): { label: string; url: string }[] {
  if (!links) return [];
  const out: { label: string; url: string }[] = [];
  if (links.live) out.push({ label: "Live demo", url: links.live });
  if (links.apk) out.push({ label: "Download APK", url: links.apk });
  if (links.docs) out.push({ label: "Docs", url: links.docs });
  for (const repo of links.repos ?? []) {
    if (repo?.url) out.push({ label: repo.label || "Repository", url: repo.url });
  }
  return out;
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Belt-and-braces: dynamicParams=false already 404s unknown slugs at the
  // routing layer, but a draft/removed file would slip past generateStaticParams
  // otherwise — notFound() renders app/not-found.tsx.
  if (!project) notFound();

  const links = resolveLinks(project.links);

  return (
    <article className="flex w-full flex-1 flex-col py-16">
      {/* Header */}
      <header className="px-4 sm:px-8">
        <Link href="/projects" className={CTA_LINK_CLASSES}>
          ← All projects
        </Link>

        <p className={`${LABEL_CLASSES} mt-10`}>Case study</p>
        <h1 className="mt-4 max-w-content font-display text-5xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-7xl">
          {project.title}
        </h1>
        {project.tagline ? (
          <p className="mt-6 max-w-prose text-base font-medium leading-relaxed text-primary">
            {project.tagline}
          </p>
        ) : null}
        <p className="mt-4 max-w-prose text-base leading-relaxed text-foreground-secondary">
          {project.summary}
        </p>

        {/* Role + stack meta */}
        <dl className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <dt className={LABEL_CLASSES}>Role</dt>
            <dd className="mt-2 max-w-prose text-sm leading-relaxed text-foreground">
              {project.role}
            </dd>
          </div>
          <div>
            <dt className={LABEL_CLASSES}>Stack</dt>
            <dd className="mt-2">
              <ul className="flex max-w-prose flex-wrap gap-x-4 gap-y-1">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {/* Frontmatter-driven links (renderer contract). Renders nothing when
            no verified link exists yet — a link-less study is valid. */}
        {links.length > 0 ? (
          <nav aria-label="Project links" className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-border-strong px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      {/* Metric highlights */}
      {project.metrics && project.metrics.length > 0 ? (
        <section
          aria-label="Key metrics"
          className="mt-12 border-y border-border px-4 py-10 sm:px-8"
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col-reverse gap-2"
              >
                <dt className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-foreground-secondary">
                  {metric.label}
                </dt>
                <dd className="font-display text-4xl font-medium leading-none text-primary sm:text-5xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* Narrative body (MDX) — rendered in an RSC, no client hydration. */}
      <div className="mt-12 px-4 sm:px-8">
        <MDXRemote
          source={project.body}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      </div>

      {/* Footer nav */}
      <footer className="mt-20 border-t border-border px-4 py-12 sm:px-8">
        <Link href="/projects" className={CTA_LINK_CLASSES}>
          ← All projects
        </Link>
      </footer>
    </article>
  );
}
