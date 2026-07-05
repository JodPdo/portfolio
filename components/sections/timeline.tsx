// Copy verbatim from docs/copy/about.md §3 "The path" (approved, PF-M1-04).
// Exactly four entries, in this order (2022 -> 2024 -> 2025 -> 2026).
//
// The 2026 entry's degree-completion phrasing is [NEEDS-VERIFICATION] in the
// copy doc: it instructs "If in progress, change the 2026 description to
// 'Finishing a B.Sc. in Computer Science…' — do not ship 'Completed'
// unconfirmed." Completion status is not yet confirmed, so this renders the
// doc's own fallback phrasing rather than the "Completed" version. The June
// 2026 resignation is a confirmed fact stated elsewhere in the copy doc
// (Section 1, "The pivot") and is unaffected.
const TIMELINE_ITEMS: { year: string; title: string; description: string }[] =
  [
    {
      year: "2022",
      title: "Royal Thai Police",
      description:
        "Police officer at Phahonyothin Police Station. Shift work, real stakes, no room for sloppiness — and, off-shift, teaching myself to code.",
    },
    {
      year: "2024",
      title: "42 Bangkok",
      description:
        "Project-based, peer-reviewed computer science school. No lectures — you build, and your peers review your code. Learned to defend my work line by line.",
    },
    {
      year: "2025",
      title: "First shipped app — AiKlao",
      description:
        "Real-time group trip-tracking platform: LINE bot, LIFF web, and a React Native app on one shared backend. Public Android APK, running in production on a self-managed VPS.",
    },
    {
      year: "2026",
      title: "B.Sc. Computer Science — and all in",
      description:
        "Finishing a B.Sc. in Computer Science and, in June 2026, resigned from the police to pursue software engineering full-time.",
    },
  ];

// Server component, no client JS. The connector line/markers are pure CSS
// decoration (aria-hidden); the actual sequence is carried by the <ol>/<li>
// semantics and visible text, so the timeline reads correctly with CSS off
// or with a screen reader.
export function Timeline() {
  return (
    <ol className="relative mt-8 flex flex-col gap-10 border-l-2 border-border pl-6 sm:pl-8">
      {TIMELINE_ITEMS.map((item) => (
        <li key={item.year} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1 left-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background"
          />
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {item.year}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
