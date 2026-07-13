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
//
// Geometry note: the connector (border-l-2) is drawn at the <ol>'s
// border-box edge, but each <li> is offset from that edge by the <ol>'s own
// pl-6/sm:pl-8 padding. A marker positioned at the <li>'s `left-0` would
// therefore land pl-6/pl-8 to the right of the line, not on it. Instead the
// marker is offset by the negative of that same padding (-left-6/sm:-left-8)
// so its un-translated position lands back on the ol's border edge, then
// `-translate-x-1/2` centers the dot on that edge — keeping marker and
// connector in the same coordinate space regardless of viewport width.
export function Timeline() {
  return (
    <ol className="relative mt-10 flex flex-col gap-12 border-l border-border-strong pl-6 sm:pl-8">
      {TIMELINE_ITEMS.map((item) => (
        <li key={item.year} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-primary bg-background sm:-left-8"
          />
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            {item.year}
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-foreground-secondary">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
