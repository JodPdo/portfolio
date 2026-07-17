import type { ComponentPropsWithoutRef } from "react";

/**
 * MDX element overrides for the case-study body (card PF-M2-06,
 * docs/ARCHITECTURE.md §3–4). Server-only: this map is passed to
 * `next-mdx-remote/rsc`'s <MDXRemote>, so nothing here crosses a client
 * boundary (no hydration cost). Styling reuses V2 "Editorial Dark" tokens
 * from app/globals.css only — no ad-hoc colors/spacing (DESIGN_SYSTEM.md).
 *
 * Headings get ids from rehype-slug and are wrapped in a self-anchor by
 * rehype-autolink-headings (behavior: "wrap"), so every section is
 * deep-linkable. The `a` override distinguishes those in-page anchors
 * (href starts with "#") from real prose links, so a heading self-link is
 * never styled like a body link and body links open external URLs safely.
 */

const HEADING_ANCHOR =
  "font-display font-medium uppercase tracking-tight text-foreground no-underline transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:text-primary motion-reduce:transition-none";

function H2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-16 scroll-mt-24 text-2xl leading-tight first:mt-0 sm:text-3xl"
      {...props}
    />
  );
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="mt-10 scroll-mt-24 text-xl leading-tight sm:text-2xl"
      {...props}
    />
  );
}

function H4(props: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className="mt-8 scroll-mt-24 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary"
      {...props}
    />
  );
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="mt-5 max-w-prose text-base leading-relaxed text-foreground"
      {...props}
    />
  );
}

function Anchor({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  // In-page heading self-anchor (rehype-autolink-headings, behavior "wrap"):
  // keep the heading's own styling — never the primary body-link treatment.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={HEADING_ANCHOR} {...props}>
        {children}
      </a>
    );
  }

  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className="rounded-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-200 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  );
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="mt-5 flex max-w-prose list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-foreground marker:text-primary"
      {...props}
    />
  );
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="mt-5 flex max-w-prose list-decimal flex-col gap-2 pl-5 text-base leading-relaxed text-foreground marker:font-mono marker:text-foreground-secondary"
      {...props}
    />
  );
}

function ListItem(props: ComponentPropsWithoutRef<"li">) {
  return <li className="pl-1.5 [&>ul]:mt-2" {...props} />;
}

function Strong(props: ComponentPropsWithoutRef<"strong">) {
  return <strong className="font-semibold text-foreground" {...props} />;
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  // Callout treatment: teal rule + mat surface, aside semantics.
  return (
    <blockquote
      className="mt-6 max-w-prose border-l-2 border-primary bg-surface-mat py-4 pl-5 pr-4 text-base italic leading-relaxed text-foreground-secondary [&>p]:mt-0 [&>p+p]:mt-4"
      {...props}
    />
  );
}

function InlineCode(props: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded-sm border border-border bg-background-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  );
}

function Pre(props: ComponentPropsWithoutRef<"pre">) {
  // Fenced block (the only fence across all 4 studies is AiKlao's untagged
  // ASCII architecture diagram). Reset the inner <code> so the inline-code
  // chrome above doesn't double-apply inside the block.
  return (
    <pre
      className="mt-6 overflow-x-auto rounded-md border border-border bg-surface-mat p-5 font-mono text-xs leading-relaxed text-foreground-secondary [&_code]:whitespace-pre [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  );
}

function HorizontalRule(props: ComponentPropsWithoutRef<"hr">) {
  return <hr className="my-12 border-t border-border" {...props} />;
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  // GFM tables (remark-gfm) — horizontally scrollable on narrow viewports.
  return (
    <div className="mt-6 max-w-full overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-sm text-foreground"
        {...props}
      />
    </div>
  );
}

function TableHead(props: ComponentPropsWithoutRef<"thead">) {
  return <thead className="border-b border-border-strong" {...props} />;
}

function TableRow(props: ComponentPropsWithoutRef<"tr">) {
  return <tr className="border-b border-border" {...props} />;
}

function TableHeaderCell(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-secondary"
      {...props}
    />
  );
}

function TableDataCell(props: ComponentPropsWithoutRef<"td">) {
  return <td className="px-4 py-3 align-top leading-relaxed" {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, any> = {
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  strong: Strong,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
  hr: HorizontalRule,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableDataCell,
};
