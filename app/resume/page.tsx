import type { Metadata } from "next";
import { buildOpenGraph, formatTitle } from "@/lib/site";
import { ResumeThumbnail } from "@/components/resume/resume-thumbnail";
import { ResumePreview } from "@/components/resume/resume-preview";

// V2 "Editorial Dark" resume page (card PF-M1-06). Download-first per the
// locked product-owner decision (CLAUDE.md #2 / SPEC Appendix A#2): download
// buttons + a document-preview thumbnail are the primary UI on every viewport;
// the inline PDF iframe is a desktop-only enhancement (ResumePreview island).
//
// SINGLE resume for all roles — no tabs, no role-switching UI (SPEC Appendix
// A#5, 2026-07-19). One PDF: public/resume/Aekkarat_Fontong_Software_Engineer.pdf.
// Layout language (numbered mono labels, display headings, hairline-bordered
// full-bleed rows) mirrors app/about/page.tsx + app/projects/page.tsx.
const DESCRIPTION =
  "Download Aekkarat Fontong's résumé — one PDF for every opening, covering Software Engineer, Backend, and QA Automation roles.";

const RESUME_PDF = "/resume/Aekkarat_Fontong_Software_Engineer.pdf";
const RESUME_FILENAME = "Aekkarat_Fontong_Software_Engineer.pdf";
const RESUME_META = "PDF · 1.7 MB · one page";

export const metadata: Metadata = {
  title: "Résumé",
  description: DESCRIPTION,
  alternates: { canonical: "/resume" },
  ...buildOpenGraph({
    title: formatTitle("Résumé"),
    description: DESCRIPTION,
    path: "/resume",
  }),
};

const LABEL_CLASSES =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export default function ResumePage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      {/* Page header */}
      <header className="px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <p className={LABEL_CLASSES}>Profile — Résumé</p>
        <h1 className="mt-4 font-display text-5xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-7xl">
          Résumé
        </h1>
      </header>

      {/* Section 1 — Download */}
      <section
        aria-labelledby="download-heading"
        className="border-t border-border px-4 py-16 sm:px-6 lg:px-8"
      >
        <p className={LABEL_CLASSES}>01 — Download</p>
        <h2
          id="download-heading"
          className="mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-5xl"
        >
          One résumé, every role
        </h2>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-16">
          <div className="flex max-w-prose flex-col gap-6 text-base leading-relaxed text-foreground">
            <p>
              One résumé covers all of it — Software Engineer, Backend, and QA
              Automation. No versions to pick between; download the PDF and
              you have the full picture.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={RESUME_PDF}
                  download={RESUME_FILENAME}
                  className={`${BUTTON_BASE} bg-primary text-primary-foreground hover:opacity-90`}
                >
                  <DownloadIcon />
                  Download résumé
                </a>
                <a
                  href={RESUME_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${BUTTON_BASE} border border-border-strong text-foreground hover:border-primary hover:text-primary`}
                >
                  Open in new tab
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens the PDF in a new tab)</span>
                </a>
              </div>
              <p className={LABEL_CLASSES}>{RESUME_META}</p>
            </div>
          </div>

          {/* Primary preview affordance — the thumbnail. */}
          <div className="lg:justify-self-end">
            <ResumeThumbnail />
          </div>
        </div>
      </section>

      {/* Section 2 — Preview (desktop enhancement only) */}
      <section
        aria-labelledby="preview-heading"
        className="hidden border-t border-border px-4 py-16 sm:px-6 lg:block lg:px-8"
      >
        <p className={LABEL_CLASSES}>02 — Preview</p>
        <h2
          id="preview-heading"
          className="mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-5xl"
        >
          Read it here
        </h2>
        <p className="mt-6 max-w-prose text-sm leading-relaxed text-foreground-secondary">
          A live preview of the same PDF. Prefer your own reader? Use the
          download button above.
        </p>
        <ResumePreview src={RESUME_PDF} title="Aekkarat Fontong — résumé (PDF preview)" />
      </section>
    </div>
  );
}
