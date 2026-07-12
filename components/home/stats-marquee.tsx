import { Marquee } from "@/components/motion/marquee";

/**
 * E3 — teal stats marquee strip (Design Brief V2 §3, card PF-V2-04).
 *
 * Server component; the <Marquee> primitive is pure CSS (pauses under
 * reduced motion via globals.css). FIXED HEIGHT (h-12) so the strip can
 * never cause layout shift (brief §5).
 *
 * Copy: approved facts only —
 * - "500+ automated tests" = trust-strip item 3, docs/copy/home.md §2
 *   (arithmetic 505 = 82+138+84+60+116+25; "500+" is the approved render).
 * - "Career-changer: Royal Thai Police → software" = CLAUDE.md / SPEC §4.2
 *   positioning (hero intro states the same fact).
 * - "Live at race.aiklaotrip.com" = SPEC §5 CS2 / trust-strip item 1.
 * - "Same discipline, better coffee." = product-owner-approved humor
 *   (Design Brief V2 §1 item 3).
 */
const STATS = [
  "500+ automated tests",
  "Career-changer: Royal Thai Police → software",
  "Live at race.aiklaotrip.com",
  "Same discipline, better coffee.",
];

export function StatsMarquee() {
  return (
    <Marquee
      durationS={32}
      className="h-12 border-y border-border bg-primary text-primary-foreground"
    >
      {Array.from({ length: 3 }, (_, rep) =>
        STATS.map((stat) => (
          <span
            key={`${rep}-${stat}`}
            className="whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.18em]"
          >
            {stat} <span aria-hidden="true">✳</span>
          </span>
        )),
      )}
    </Marquee>
  );
}
