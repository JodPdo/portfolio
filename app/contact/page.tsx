import type { Metadata } from "next";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import {
  buildOpenGraph,
  formatTitle,
  GITHUB_DISPLAY,
  GITHUB_URL,
  LINKEDIN_DISPLAY,
  LINKEDIN_URL,
} from "@/lib/site";

const DESCRIPTION =
  "Get in touch with Aekkarat Fontong — email, GitHub, and LinkedIn.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  ...buildOpenGraph({
    title: formatTitle("Contact"),
    description: DESCRIPTION,
    path: "/contact",
  }),
};

// Email verified in docs/SPEC.md §4.4 / Appendix A#3 (RESOLVED 2026-07-05 —
// product owner confirmed this address, cleared to ship). NO phone number,
// ever (CLAUDE.md decision #1 / SPEC Appendix A#1). EMAIL stays local: this
// page is its only consumer, and it deliberately stays out of lib/site.ts,
// away from the JSON-LD Person block (ARCHITECTURE.md §7). The GitHub/LinkedIn
// URLs and their display labels come from lib/site.ts — never re-declare them.
const EMAIL = "fontong.jod.aekkarut@gmail.com";

// PF-M4-03: below `sm` the LinkedIn handle wraps to two lines, so that row
// grows to 94px while Email/GitHub stay at 74px and the rhythm breaks. The
// handle must stay full and truthful (the short form no longer resolves), so
// the fix is layout: every row reserves the wrapped height on narrow screens
// and all three stay equal. From `sm` up the rows never wrap (the list is
// capped at max-w-md), so the reservation is released and they keep their
// natural, even 74px. `items-center` keeps icon + text centred in either case.
const ROW_CLASSES =
  "flex min-h-[94px] items-center gap-4 rounded-lg border border-border bg-background-subtle px-5 py-4 transition-colors duration-200 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:min-h-0";

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Contact
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
        I&apos;m looking for Software Engineer, Backend, or QA Automation
        roles. Reach out through any of the channels below.
      </p>

      <ul className="mt-10 flex max-w-md flex-col gap-4">
        <li>
          <a href={`mailto:${EMAIL}`} className={ROW_CLASSES}>
            <MailIcon />
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                Email
              </span>
              <span className="text-sm text-foreground">{EMAIL}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ROW_CLASSES}
          >
            <GitHubIcon />
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                GitHub
              </span>
              <span className="text-sm text-foreground">
                {GITHUB_DISPLAY}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </span>
          </a>
        </li>
        <li>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ROW_CLASSES}
          >
            <LinkedInIcon />
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                LinkedIn
              </span>
              <span className="text-sm text-foreground">
                {LINKEDIN_DISPLAY}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
