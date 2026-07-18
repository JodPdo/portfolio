import { ImageResponse } from "next/og";
import { PERSON_NAME, JOB_TITLE, SITE_URL } from "@/lib/site";

/**
 * Default Open Graph / Twitter card image (PF-M3-01), generated at build with
 * next/og `ImageResponse`. Because this file lives at the app root, Next's
 * file convention applies the resulting image to every route as the default
 * `og:image` and `twitter:image` (routes may still override with their own).
 *
 * On-brand with DESIGN_SYSTEM V2 "Editorial Dark": near-black background,
 * off-white display name, teal (#5eead4) accent + role line, mono-style
 * uppercase labels. No custom webfont is loaded — ImageResponse's built-in
 * font keeps the build hermetic (no network fetch); the uppercase + tracking
 * treatment carries the editorial feel.
 */

export const runtime = "nodejs";
export const alt = `${PERSON_NAME} — ${JOB_TITLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Design tokens (app/globals.css :root).
const BACKGROUND = "#0a0a0a";
const FOREGROUND = "#f5f5f0";
const FOREGROUND_SECONDARY = "#999999";
const PRIMARY = "#5eead4";
const BORDER = "#2a2a2a";

export default function OpengraphImage() {
  const domain = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          padding: "80px",
          // Thin teal top rule, editorial.
          borderTop: `8px solid ${PRIMARY}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: FOREGROUND_SECONDARY,
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: -2,
              textTransform: "uppercase",
              color: FOREGROUND,
            }}
          >
            {PERSON_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 44,
              lineHeight: 1.1,
              color: PRIMARY,
            }}
          >
            {JOB_TITLE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 32,
            borderTop: `2px solid ${BORDER}`,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: FOREGROUND_SECONDARY,
          }}
        >
          <div style={{ display: "flex" }}>{domain}</div>
          <div style={{ display: "flex", color: PRIMARY }}>SE · Backend · QA</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
