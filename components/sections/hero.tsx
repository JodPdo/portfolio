import Link from "next/link";

// Copy verbatim from docs/copy/home.md §1 (approved, PF-M1-02).
const GITHUB_URL = "https://github.com/JodPdo";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-content px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1
          id="hero-heading"
          className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl"
        >
          Aekkarat Fontong
        </h1>
        <p className="text-lg font-medium text-foreground sm:text-xl">
          Software &amp; QA Automation Engineer — I ship production software
          and the tests that keep it honest.
        </p>
        <p className="text-base leading-relaxed text-foreground sm:text-lg">
          From a 4.5-year career in the Royal Thai Police to building real,
          deployed apps — React Native, Node.js, Spring Boot, and 500+
          automated tests across six repositories.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className={`${BUTTON_BASE} bg-primary text-primary-foreground hover:opacity-90`}
          >
            View projects
          </Link>
          <Link
            href="/resume"
            className={`${BUTTON_BASE} border border-border text-foreground hover:border-primary hover:text-primary`}
          >
            Download résumé
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BUTTON_BASE} text-foreground underline-offset-4 hover:text-primary hover:underline`}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
