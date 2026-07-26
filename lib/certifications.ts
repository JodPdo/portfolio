import type { StaticImageData } from "next/image";

import claude101 from "@/public/media/certs/claude-101.webp";
import introToMcp from "@/public/media/certs/intro-to-mcp.webp";
import claudeCodeInAction from "@/public/media/certs/claude-code-in-action.webp";
import postmanApiTesting from "@/public/media/certs/postman-api-testing.webp";
import postmanApiPrototyping from "@/public/media/certs/postman-api-prototyping.webp";
import postmanApiDocumentation from "@/public/media/certs/postman-api-documentation.webp";
import mcaProfessionalAiUsage from "@/public/media/certs/mca-professional-ai-usage.webp";
import mcaGenerativeAiFirstJobber from "@/public/media/certs/mca-generative-ai-first-jobber.webp";

/**
 * Certificates — SINGLE SOURCE OF TRUTH, grouped by issuer.
 *
 * Architect ruling 2026-07-26 (docs/DESIGN_SYSTEM.md decision log §3 +
 * docs/ARCHITECTURE.md §8); content is verbatim from docs/copy/certifications.md
 * (card PF-CERT-01, rev 2). TWO consumers read this module — `/certifications`
 * and `/about` §4 — and neither may hold a second hand-maintained copy of these
 * facts (ARCHITECTURE.md §7: a second copy is precisely the defect that shipped
 * a wrong link sitewide once already).
 *
 * SHAPE RULES (binding — a change needs a fresh architect ruling):
 *  - `issuer` lives on the GROUP, never per certificate.
 *  - NO `year` field: the card's `ISSUER · YEAR` line renders `certYear()`, a
 *    fixed-offset slice of the ISO `completed` date. One fact, not two that can
 *    disagree.
 *  - `verifyUrl` is OPTIONAL and its ABSENCE is the only encoding for "no verify
 *    link" — never `""`, never `"#"`, never the issuer homepage standing in.
 *    The `VERIFY` anchor renders only when the key is present.
 *  - `descriptor` is an EN gloss for NON-ENGLISH titles only (the 2 Mahidol
 *    records). English certs get no short form: `/about` and `/certifications`
 *    render the same full official names.
 *  - No `slug`, no `id`, no `featured`, no per-cert route.
 *
 * JOIN KEY — READ BEFORE EDITING (ruling §3f). The ONLY safe key tying a
 * certificate to its name, date, verify URL and thumbnail is the **Skilljar
 * verify code**: `docs/assets/certs/certificate-<code>-*.pdf` ↔
 * `https://verify.skilljar.com/c/<code>`. Never key a record by a remembered
 * title. The `API Testing Path (v12)` / `API Prototyping Path` pair was already
 * transcribed SWAPPED once; both share the completion date 2026-06-23, so the
 * mistake produced a page that looked entirely plausible and shipped a VERIFY
 * link opening a certificate with a different name on it. Each record below
 * carries its source filename, and `name`/`verifyUrl` must be copied together
 * as one unit.
 *
 * Titles are the printed titles, VERBATIM — the `Path` vs `Learning Path`
 * mismatch and the `(v12)` suffix are genuinely how they print and are NOT to be
 * tidied into a matched set. The one permitted normalisation is dropping a
 * trailing document-type suffix (` - Completion Certificate`).
 *
 * Thumbnails are static imports from `public/media/certs/*.webp` (derived,
 * committed); the raw PDFs/PNGs stay in `docs/assets/certs/` and are gitignored
 * — never under `public/`.
 */
export interface Certification {
  /** Official title, exactly as printed on the certificate. */
  name: string;
  /** Short EN gloss — ONLY for non-English titles. */
  descriptor?: string;
  /** ISO "YYYY-MM-DD", the date printed on / recorded for the certificate. */
  completed: string;
  /** Certificate-specific public URL. OMIT the key entirely when none exists. */
  verifyUrl?: string;
  thumbnail: StaticImageData;
  thumbnailAlt: string;
}

export interface CertificationGroup {
  issuer: string;
  certifications: Certification[];
}

export const CERTIFICATION_GROUPS: CertificationGroup[] = [
  {
    issuer: "Anthropic Education",
    certifications: [
      {
        // Source: docs/assets/certs/certificate-fssrxztod2au-1782928704.pdf
        name: "Claude 101",
        completed: "2026-07-01",
        verifyUrl: "https://verify.skilljar.com/c/fssrxztod2au",
        thumbnail: claude101,
        thumbnailAlt:
          "Claude 101 certificate of completion from Anthropic Education",
      },
      {
        // Source: docs/assets/certs/certificate-c2v9qrdwopvs-1782835792.pdf
        name: "Introduction to Model Context Protocol",
        completed: "2026-06-30",
        verifyUrl: "https://verify.skilljar.com/c/c2v9qrdwopvs",
        thumbnail: introToMcp,
        thumbnailAlt:
          "Introduction to Model Context Protocol certificate of completion from Anthropic Education",
      },
      {
        // Source: docs/assets/certs/certificate-8tresf5nsvnj-1782771363.pdf
        name: "Claude Code in Action",
        completed: "2026-06-29",
        verifyUrl: "https://verify.skilljar.com/c/8tresf5nsvnj",
        thumbnail: claudeCodeInAction,
        thumbnailAlt:
          "Claude Code in Action certificate of completion from Anthropic Education",
      },
    ],
  },
  {
    issuer: "Postman Academy",
    certifications: [
      {
        // Source: docs/assets/certs/certificate-vypt62wvtfqp-1782251767 (2).pdf
        // Verify code vypt62wvtfqp prints "API Testing Path (v12)" — NOT
        // Prototyping. Do not reorder this name away from its URL.
        name: "API Testing Path (v12)",
        completed: "2026-06-23",
        verifyUrl: "https://verify.skilljar.com/c/vypt62wvtfqp",
        thumbnail: postmanApiTesting,
        thumbnailAlt: "API Testing Path certificate from Postman Academy",
      },
      {
        // Source: docs/assets/certs/certificate-r7wwtwv8yeye-1782209461 (3).pdf
        // Verify code r7wwtwv8yeye prints "API Prototyping Path".
        name: "API Prototyping Path",
        completed: "2026-06-23",
        verifyUrl: "https://verify.skilljar.com/c/r7wwtwv8yeye",
        thumbnail: postmanApiPrototyping,
        thumbnailAlt: "API Prototyping Path certificate from Postman Academy",
      },
      {
        // Source: docs/assets/certs/certificate-fm4c82wavk72-1782323966 (4).pdf
        // Prints "API Documentation Learning Path - Completion Certificate";
        // the trailing document-type suffix is the ONE permitted normalisation.
        name: "API Documentation Learning Path",
        completed: "2026-06-24",
        verifyUrl: "https://verify.skilljar.com/c/fm4c82wavk72",
        thumbnail: postmanApiDocumentation,
        thumbnailAlt:
          "API Documentation Learning Path certificate from Postman Academy",
      },
    ],
  },
  {
    // Both Mahidol records ship with NO `verifyUrl` key at all: their QR codes
    // resolve to the generic channel.mahidol.ac.th homepage, not a
    // per-certificate page (product-owner decision, ruling §3c). Do not
    // substitute the homepage, a placeholder, or the out-of-scope
    // Parchment/Badgr URL — that credential is a different, 9th one.
    issuer: "Mahidol Channel Academy — Mahidol University",
    certifications: [
      {
        // Source: docs/assets/certs/40-1784819090-certificate_mca.png (prints 23-07-2026)
        name: "คัมภีร์ใช้งาน AI ให้เก่งและแม่นยำระดับมืออาชีพ",
        descriptor: "Professional AI usage",
        completed: "2026-07-23",
        thumbnail: mcaProfessionalAiUsage,
        thumbnailAlt:
          "Mahidol Channel Academy certificate from Mahidol University for a Thai-language course on professional-level AI use",
      },
      {
        // Source: docs/assets/certs/22-1784870813-certificate_mca.png (prints 24-07-2026)
        name: "Generative AI ที่ช่วยให้ First Jobber ทำงานง่ายขึ้น",
        descriptor: "Generative AI for first jobbers",
        completed: "2026-07-24",
        thumbnail: mcaGenerativeAiFirstJobber,
        thumbnailAlt:
          "Mahidol Channel Academy certificate from Mahidol University for a Thai-language course on generative AI for first jobbers",
      },
    ],
  },
];

/**
 * A flattened certificate with its group's `issuer` attached.
 *
 * NOTE vs. the ruling's sketch (`getAllCertifications(): Certification[]`): the
 * one consumer of this helper is `/about` §4, which renders **name + issuer**,
 * so the flattened record has to carry `issuer` or the caller would have to
 * re-implement the grouping it just flattened. This does NOT reintroduce the
 * per-cert `issuer` the ruling forbids — `issuer` is still stored exactly once,
 * on the group; it is attached here at flatten time, derived, never authored.
 */
export type FlatCertification = Certification & { issuer: string };

/**
 * Flattened, group-ordered list — used by `/about` §4, which renders name +
 * issuer only. Order is exactly the flatten of CERTIFICATION_GROUPS.
 */
export function getAllCertifications(): FlatCertification[] {
  return CERTIFICATION_GROUPS.flatMap((group) =>
    group.certifications.map((certification) => ({
      ...certification,
      issuer: group.issuer,
    })),
  );
}

/** Display year for the card's `ISSUER · YEAR` line. */
export function certYear(completed: string): string {
  return completed.slice(0, 4);
}

/**
 * True when a title contains Thai script (Unicode block U+0E00–U+0E7F), so the
 * element rendering it can carry `lang="th"` and a screen reader switches voice
 * (ruling §3d). Lives here so `/certifications` and `/about` — the two
 * consumers — apply the identical test rather than each guessing. The two
 * Mahidol titles are mixed Thai/Latin, so the test is "contains any Thai", not
 * "is entirely Thai".
 */
export function isThaiTitle(name: string): boolean {
  return /[฀-๿]/.test(name);
}
