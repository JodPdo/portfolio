import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

// Handles verified in docs/SPEC.md 4.4. No phone number, ever
// (product-owner decision, CLAUDE.md). Email is intentionally not
// repeated here — it ships only on /contact once verified with the
// product owner (PF-M1-07), per CLAUDE.md decision #3.
const GITHUB_URL = "https://github.com/JodPdo";
const LINKEDIN_URL = "https://www.linkedin.com/in/aekkarut-fontong-b781bb319/";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-subtle">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-8 text-sm text-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>
          &copy; {year} Aekkarat Fontong. Built with Next.js, deployed on
          Vercel.
        </p>

        {/* WCAG 2.2 SC 2.5.8 (PF-M3-05): each link's clickable box is >= 44px
            tall (inline-flex + min-h); the negative vertical margin keeps the
            footer's visible height/rhythm unchanged. */}
        <ul className="flex items-center gap-5">
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-sm transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-sm transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
