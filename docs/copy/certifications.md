# Certifications page copy — `/certifications`

**Card:** PF-CERT-01 · **Owner:** content-writer · **Status:** draft for review
**Implements:** architect ruling 2026-07-26 (`docs/DESIGN_SYSTEM.md` decision log — full ruling; `docs/ARCHITECTURE.md` §8 — routes/`lib` ownership). Built by frontend-engineer in **PF-CERT-02**.
**Sources of truth:** the PO-verified fact list in the PF-CERT-01 card + the raw certificates in `docs/assets/certs/` + the six live `verify.skilljar.com` pages.
**Rules honored:** zero invented facts; no phone number; Thai titles verbatim, never translated; **exactly 6 of 8 records carry a `verifyUrl`, the 2 Mahidol records carry none** — no `""`, no `"#"`, no issuer homepage stand-in (DESIGN_SYSTEM 2026-07-26 §3c; same rule as ARCHITECTURE §3).

There are **no `[NEEDS-VERIFICATION]` markers left in this document.** Everything below is either printed on a certificate in `docs/assets/certs/` or resolvable at a public verify URL. If a fact is ever changed, change it **here and in `lib/certifications.ts` only** — `/about` reads the same module and must never hold a second copy (DESIGN_SYSTEM 2026-07-26 §4).

**Out of scope, must appear nowhere:** the separately-supplied Parchment/Badgr URL. It belongs to a different, 9th credential and is deliberately absent from this document, from `lib/certifications.ts`, and from the page.

> **Correction applied 2026-07-26 (rev 2) — read this before typing the Postman records.** The first draft of this doc carried the two Postman title↔URL pairings **swapped**, inherited from the relayed fact list. All six Skilljar PDFs were then rasterized and read directly, which corrected two names. The authoritative pairing is now: **`API Testing Path (v12)` = `vypt62wvtfqp`** and **`API Prototyping Path` = `r7wwtwv8yeye`** — the opposite of what the titles and file order intuitively suggest. Both were issued on the same day (2026-06-23), which is exactly why the swap did not show up as a date mismatch. Pair by **verify code, not by intuition**.

---

## 1. Page metadata

- **Title (passed to `formatTitle`):** `Certifications`
- **Meta description:**

> `Eight certificates from Anthropic Education, Postman Academy and Mahidol University — completion dates and verification links where the issuer publishes one.`

---

## 2. Page header

Same grammar as `app/resume/page.tsx`: a **non-numbered** mono label above the display `<h1>`.

- **Label:** `Profile — Certifications`
- **H1:** `Proof of learning.`
  *Product-owner approved, ship verbatim including the full stop. The display class uppercases it, so it renders `PROOF OF LEARNING.`*
- **Intro (one line, sits under the H1):**

> Eight courses, three issuers, all completed in 2026. Six carry a public verification link; where an issuer doesn't publish a per-certificate page, I say so rather than link to something that isn't proof.

*Writer's note: the second sentence is doing real work — it is the honest explanation for why two of the eight cards have no `VERIFY` affordance, and it keeps a reviewer from reading the gap as an oversight. Do not cut it to save a line.*

---

## 3. Issuer-group headings

One `<section>` per group, in this order (editorial, per the ruling). Label = `NN — {issuer}`, `<h2>` = `{issuer}`.

| # | Label | `<h2>` / `issuer` string |
|---|---|---|
| 01 | `01 — Anthropic Education` | `Anthropic Education` |
| 02 | `02 — Postman Academy` | `Postman Academy` |
| 03 | `03 — Mahidol Channel Academy — Mahidol University` | `Mahidol Channel Academy — Mahidol University` |

*Notes for frontend-engineer:*
- *`issuer` is **one string per group**, used by the section label, the `<h2>`, the card's `ISSUER · YEAR` line, and `/about`. Do not introduce a short form for the mono line — a second string is a second fact that can drift.*
- *Group 03's full string is long and will wrap to two lines in the mono `ISSUER · YEAR` line at 375px. That is expected and fine. The double em dash in the label (`03 — Mahidol Channel Academy — Mahidol University`) is intentional: the certificate itself reads "มหาวิทยาลัยมหิดล โดย Mahidol Channel Academy (MCA)" — Mahidol **University** is the issuing body, and dropping it would cost the credential its recognizable name.*
- *`Anthropic Education` — not "Anthropic Academy". The old `/about` array said "Anthropic Academy"; that string is retired by this doc.*
- ***Every one of the eight certificates renders `· 2026`*** *(from `completed.slice(0, 4)`).*

---

## 4. Per-certificate records

Field names match the `Certification` interface in the ruling. **Within-group order is as listed here — do not re-sort by date.** Anthropic runs newest-first; Postman runs in learning-path order (Testing → Prototyping → Documentation), which leads with the one that matters most for a QA role; Mahidol runs chronologically.

*On the Postman order specifically (rev 2): when the two titles were corrected, the **positions** were re-cut rather than left alone, so Testing still leads the group. That rationale is editorial and unchanged — but it means position 1 now carries verify code `vypt62wvtfqp` and position 2 carries `r7wwtwv8yeye`. **Copy each `name`/`verifyUrl` pair together, as a unit.** Both certificates share the completion date 2026-06-23, so a mis-pairing produces a page that looks entirely plausible and is wrong.*

Thumbnail filenames below are a **suggestion** (asset naming is the engineer's call) — but the **source-file mapping is not**: the two Mahidol PNG filenames are ordered misleadingly, and swapping them would put the wrong date on the wrong course. Verified by opening both images.

### Group 01 — Anthropic Education

**01.1**
- `name`: `Claude 101`
- `descriptor`: — (English title, no descriptor; ruling §3d)
- `completed`: `2026-07-01`
- `verifyUrl`: `https://verify.skilljar.com/c/fssrxztod2au`
- `thumbnailAlt`: `Claude 101 certificate of completion from Anthropic Education`
- Source: `docs/assets/certs/certificate-fssrxztod2au-1782928704.pdf` → suggested `public/media/certs/claude-101.webp`

**01.2**
- `name`: `Introduction to Model Context Protocol`
- `descriptor`: —
- `completed`: `2026-06-30`
- `verifyUrl`: `https://verify.skilljar.com/c/c2v9qrdwopvs`
- `thumbnailAlt`: `Introduction to Model Context Protocol certificate of completion from Anthropic Education`
- Source: `docs/assets/certs/certificate-c2v9qrdwopvs-1782835792.pdf` → suggested `public/media/certs/intro-to-mcp.webp`

**01.3**
- `name`: `Claude Code in Action`
- `descriptor`: —
- `completed`: `2026-06-29`
- `verifyUrl`: `https://verify.skilljar.com/c/8tresf5nsvnj`
- `thumbnailAlt`: `Claude Code in Action certificate of completion from Anthropic Education`
- Source: `docs/assets/certs/certificate-8tresf5nsvnj-1782771363.pdf` → suggested `public/media/certs/claude-code-in-action.webp`

### Group 02 — Postman Academy

*The three printed titles are stylistically inconsistent — one carries a `(v12)` version tag, one says `Path` where another says `Learning Path`. That is genuinely how they are printed, confirmed by reading the rasterized PDFs. **Do not regularise them into a matching set** — the rule is "official name exactly as printed on the certificate" (architect ruling §3(f)(ii)), and tidying them would be inventing three titles that no certificate carries. **Exactly one normalisation is permitted by that ruling:** dropping a trailing ` - Completion Certificate` document-type suffix (it names the document, not the credential — see 02.3). Nothing else about these titles may be adjusted.*

**02.1**
- `name`: `API Testing Path (v12)`
- `descriptor`: —
- `completed`: `2026-06-23`
- `verifyUrl`: `https://verify.skilljar.com/c/vypt62wvtfqp`
- `thumbnailAlt`: `API Testing Path certificate from Postman Academy`
- Source: `docs/assets/certs/certificate-vypt62wvtfqp-1782251767 (2).pdf` → suggested `public/media/certs/postman-api-testing.webp`

**02.2**
- `name`: `API Prototyping Path`
- `descriptor`: —
- `completed`: `2026-06-23`
- `verifyUrl`: `https://verify.skilljar.com/c/r7wwtwv8yeye`
- `thumbnailAlt`: `API Prototyping Path certificate from Postman Academy`
- Source: `docs/assets/certs/certificate-r7wwtwv8yeye-1782209461 (3).pdf` → suggested `public/media/certs/postman-api-prototyping.webp`

**02.3**
- `name`: `API Documentation Learning Path`
- `descriptor`: —
- `completed`: `2026-06-24`
- `verifyUrl`: `https://verify.skilljar.com/c/fm4c82wavk72`
- `thumbnailAlt`: `API Documentation Learning Path certificate from Postman Academy`
- Source: `docs/assets/certs/certificate-fm4c82wavk72-1782323966 (4).pdf` → suggested `public/media/certs/postman-api-documentation.webp`
- **CLOSED — do not "fix" this back.** This certificate prints as `API Documentation Learning Path - Completion Certificate`, and the live verify page carries the suffix too. It still ships as `API Documentation Learning Path`: architect ruling §3(f)(ii) makes dropping a trailing ` - Completion Certificate` **the single permitted normalisation**, because that suffix names the *document*, not the credential, and is redundant on a page where every card is a certificate. Raised as an open point in rev 2, resolved by code-reviewer, and the ruling outranks the print. **No change.**

*Version tag: `(v12)` stays — it is printed on the certificate and is part of the credential's name, not a document-type suffix, so the §3(f)(ii) normalisation does not reach it. Silently dropping a version identifier is the kind of small "improvement" that makes a fact unverifiable against its own source.*

### Group 03 — Mahidol Channel Academy — Mahidol University

Both records ship **with no `verifyUrl` key at all** and therefore **no `VERIFY` anchor** — the certificates' QR codes resolve to the generic `channel.mahidol.ac.th` homepage, not to a per-certificate page (product-owner decision, recorded in DESIGN_SYSTEM 2026-07-26 §3c). Do not substitute the homepage, a placeholder, or the out-of-scope Parchment/Badgr URL.

Both `name` values are **Thai and render verbatim, never translated or transliterated**, on an element carrying `lang="th"`. The `descriptor` is a short English gloss riding alongside as secondary mono text — it is a reading aid, not a title.

**03.1**
- `name`: `คัมภีร์ใช้งาน AI ให้เก่งและแม่นยำระดับมืออาชีพ`
- `descriptor`: `Professional AI usage`
- `completed`: `2026-07-23`
- `verifyUrl`: **none — omit the key**
- `thumbnailAlt`: `Mahidol Channel Academy certificate from Mahidol University for a Thai-language course on professional-level AI use`
- Source: `docs/assets/certs/40-1784819090-certificate_mca.png` (prints `23-07-2026`) → suggested `public/media/certs/mca-professional-ai-usage.webp`

**03.2**
- `name`: `Generative AI ที่ช่วยให้ First Jobber ทำงานง่ายขึ้น`
- `descriptor`: `Generative AI for first jobbers`
- `completed`: `2026-07-24`
- `verifyUrl`: **none — omit the key**
- `thumbnailAlt`: `Mahidol Channel Academy certificate from Mahidol University for a Thai-language course on generative AI for first jobbers`
- Source: `docs/assets/certs/22-1784870813-certificate_mca.png` (prints `24-07-2026`) → suggested `public/media/certs/mca-generative-ai-first-jobber.webp`

*Alt-text note: 02.1's alt says "API Testing Path" without the `(v12)` tag on purpose — a version string read aloud adds nothing for a screen-reader user, and the `name` field beside the image already carries it verbatim. The eight `thumbnailAlt` strings are distinct and name their course — none is a bare "certificate", and none repeats another (DoD requirement). Recipient names are deliberately **not** in alt text: they add nothing a sighted reader gets from the thumbnail, and the printed spelling varies by issuer (see §6).*

---

## 5. `/about` §4 — replacement copy

The local `CERTIFICATIONS` array in `app/about/page.tsx` is deleted; this section renders from `getAllCertifications()`. The section keeps its existing label `04 — Certifications` and `<h2>` `Certifications` — About is not renumbered.

**Intro sentence (new — sits between the `<h2>` and the list):**

> Eight courses completed in 2026: Claude and MCP at Anthropic, the API testing, prototyping and documentation paths at Postman, and two AI courses at Mahidol University.

**The list — name + issuer only.** No thumbnails, no dates, no verify links on `/about` (ruling §4). Rendered order is the flatten order of `CERTIFICATION_GROUPS`, which is exactly:

| Name (full official title, as in §4) | Issuer (from the group) |
|---|---|
| Claude 101 | Anthropic Education |
| Introduction to Model Context Protocol | Anthropic Education |
| Claude Code in Action | Anthropic Education |
| API Testing Path (v12) | Postman Academy |
| API Prototyping Path | Postman Academy |
| API Documentation Learning Path | Postman Academy |
| คัมภีร์ใช้งาน AI ให้เก่งและแม่นยำระดับมืออาชีพ | Mahidol Channel Academy — Mahidol University |
| Generative AI ที่ช่วยให้ First Jobber ทำงานง่ายขึ้น | Mahidol Channel Academy — Mahidol University |

The abbreviations the page ships today — "MCP", "Claude Code", "API Testing", "Anthropic Academy" — are **retired**. Full official names everywhere.

**Link out (exactly one internal link in this section, placed after the list):**

> `See all certifications →` → `/certifications`

Match the existing `CTA_LINK_CLASSES` arrow convention already used on `/about` ("View projects →"); it is an internal link, so no `↗`, no `target="_blank"`.

**One flag for the architect / frontend-engineer (copy recommendation, not a decision I own):** the two Thai entries land on `/about` as bare Thai titles with no English gloss. `descriptor` is already in the shared module, so rendering it as small secondary text under those two names costs nothing and duplicates no fact — the ruling's §4 exclusion list names thumbnails, dates and verify links, not `descriptor`. **Recommended: include it.** If the architect reads §4 as strictly name + issuer, ship without it — the copy above works either way, unchanged. Either way the Thai names need `lang="th"`.

---

## 6. Fact traceability (for code-reviewer)

| Claim | Source |
|---|---|
| 3 Anthropic Education titles + dates | PF-CERT-01 PO-verified list; each PDF in `docs/assets/certs/` is filename-keyed to its verify code (`certificate-fssrxztod2au-…` ↔ `verify.skilljar.com/c/fssrxztod2au`, and likewise for `c2v9qrdwopvs`, `8tresf5nsvnj`) |
| 3 Postman Academy titles + dates | **Rasterized PDFs read directly (rev 2)** — `vypt62wvtfqp` prints "API Testing Path (v12)", `r7wwtwv8yeye` prints "API Prototyping Path", `fm4c82wavk72` prints "API Documentation Learning Path - Completion Certificate"; issue dates June 23 / June 23 / June 24, 2026. **This read corrected the relayed list, which had Testing and Prototyping swapped** |
| 6 verify URLs | PF-CERT-01 PO-verified list, each also printed as the "View" URL on its own certificate. **Live HTTP 200 + cert-specific check is code-reviewer's, per both cards' DoD** — this doc does not claim to have fetched them |
| Thai title + date, professional AI usage (2026-07-23) | `docs/assets/certs/40-1784819090-certificate_mca.png`, read directly: title `คัมภีร์ใช้งาน AI ให้เก่งและแม่นยำระดับมืออาชีพ`, printed date `23-07-2026` |
| Thai title + date, first jobber (2026-07-24) | `docs/assets/certs/22-1784870813-certificate_mca.png`, read directly: title `Generative AI ที่ช่วยให้ First Jobber ทำงานง่ายขึ้น`, printed date `24-07-2026` |
| Issuer string `Mahidol Channel Academy — Mahidol University` | Both MCA PNGs print `มหาวิทยาลัยมหิดล โดย Mahidol Channel Academy (MCA)` and are signed by the President of Mahidol University |
| Two MCA certs have no per-certificate verify page | Product-owner decision recorded in DESIGN_SYSTEM 2026-07-26 §3c (QR resolves to the generic `channel.mahidol.ac.th` homepage) |
| "all completed in 2026" / "· 2026" on every card | All eight `completed` dates are 2026 |
| "Eight courses, three issuers" | Count of the records in §4 |

**Stated plainly — who verified what:** the two Mahidol PNGs I opened and transcribed character by character myself. The six Skilljar **PDFs I could not render** (`pdftoppm` was not available in my environment and the PDFs' text streams are compressed); rev 1 of this doc therefore rested the six names and dates on the relayed PO list, and said so. Those PDFs have since been rasterized and read directly, and that read **found a real error: the Testing and Prototyping titles were swapped in the relayed list.** Rev 2 above carries the corrected pairing. So the Postman and Anthropic records are now backed by a direct read of the certificate images — but not one I performed.

**That history is the argument for the live check, not against it.** These facts have already been wrong once, in a way that no date or filename cross-check would have caught (both certificates share 2026-06-23). The live-URL step in both cards' DoD is therefore **not a formality: code-reviewer must confirm all six URLs return HTTP 200 and that the page shown is the specific certificate named beside that URL in §4** — the right credential, per record, not just six green status codes.

**Precedence when the certificate and the verify page disagree — settled, and it is not "the verify page wins".** They *do* disagree here: Skilljar's verify pages for `vypt62wvtfqp` and `r7wwtwv8yeye` show catalog-style titles (`API Testing Learning Path - Completion Certificate`, `API Prototyping Learning Path - Completion Certificate`) while the certificates themselves print `API Testing Path (v12)` and `API Prototyping Path`. The rule, per architect ruling §3(f)(ii) and confirmed by code-reviewer:

- **The certificate PDF/PNG is authoritative for `name`** — verbatim print, inconsistencies preserved. The one sanctioned normalisation is dropping a trailing ` - Completion Certificate` document-type suffix, which names the document rather than the credential.
- **The verify page is authoritative only for (a) existence — HTTP 200, real cert-specific page — and (b) the completion date.**

So a verify-page title that differs from §4 is **not** a defect and must **not** be copied back into `name`. Doing so here would delete a genuinely printed `(v12)` and substitute a catalog string that appears on no certificate — an invented title, which is the content-integrity breach §3(f)(ii) exists to block. If a **date** ever disagrees, that is a real conflict: stop and escalate rather than pick one.

**Name-spelling variance — not a defect, do not "fix":** the certificates print `Aekkarat Fontong` (Anthropic), `Aekkarut Fontong` (Postman) and `เอกรัตน์ ฝนธง` (Mahidol). All three are the product owner. None of these strings is rendered on the site by this copy (recipient names appear only inside the thumbnail images themselves), so no reconciliation is needed anywhere in code.

---

## 7. Supersedes

`docs/copy/about.md` §4 — the six-row `[NEEDS-VERIFICATION]` certification table and its interim "render name · issuer with no Verify link" rule. Both are resolved by this document: the URLs exist, the official titles are known, and the list is eight, not six. §5 above is the replacement copy for that section.
