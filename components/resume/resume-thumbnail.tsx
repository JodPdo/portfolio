// Document-preview thumbnail for /resume (card PF-M1-06).
//
// Why a styled preview and not a rasterized first-page image: the product
// owner delivered a single static PDF (public/resume/…​.pdf) and the DoD asks
// for a "thumbnail". Rendering the real first page to a PNG needs a PDF
// rasterizer (Ghostscript / pdfjs-dist), i.e. a NEW build/npm dependency —
// not warranted for one static asset and out of my authority without architect
// sign-off (CLAUDE.md change control). So this is a token-built, letter-aspect
// document preview that reads unmistakably as "a résumé PDF" in the V2
// Editorial-Dark language, exposed to assistive tech as a single image with a
// descriptive accessible name (role="img" + aria-label = the alt-text
// equivalent). It is purely presentational — the actual download lives in the
// adjacent buttons — so it is not itself interactive.
//
// FALLBACK-CONTENT NOTE: the name / role / faux section labels shown here are a
// visual stand-in for the document's layout, NOT a data source; the file itself
// is the source of truth.

const FAUX_LINES = [4, 6, 5, 6, 3];

export function ResumeThumbnail() {
  return (
    <div
      role="img"
      aria-label="Preview of Aekkarat Fontong's one-page résumé — a PDF summarising Software Engineer, Backend, and QA Automation experience."
      className="mx-auto flex aspect-[17/22] w-full max-w-[19rem] flex-col overflow-hidden border border-border-strong bg-surface-mat shadow-[0_1px_0_0_var(--color-border)]"
    >
      {/* Header band — name + role, mirroring the document's masthead. */}
      <div className="border-b border-border/70 px-5 pt-6 pb-4">
        <p className="font-display text-lg font-medium uppercase leading-none tracking-tight text-foreground">
          Aekkarat Fontong
        </p>
        <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
          Software &amp; QA Automation Engineer
        </p>
      </div>

      {/* Faux content — abstract section bars, decorative only. */}
      <div
        aria-hidden="true"
        className="flex flex-1 flex-col gap-4 px-5 py-5"
      >
        {FAUX_LINES.map((count, section) => (
          <div key={section} className="flex flex-col gap-1.5">
            <span className="h-1 w-10 rounded-full bg-primary/50" />
            {Array.from({ length: count }).map((_, line) => (
              <span
                key={line}
                className="h-1 rounded-full bg-foreground/15"
                style={{ width: `${95 - line * (60 / count)}%` }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Corner file tag. */}
      <div className="flex items-center justify-between border-t border-border/70 px-5 py-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-secondary">
          Résumé
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-secondary">
          PDF
        </span>
      </div>
    </div>
  );
}
