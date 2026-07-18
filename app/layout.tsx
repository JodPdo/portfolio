import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
} from "@/lib/site";

// Display face (V2 — Editorial Dark, ADR-0003): huge uppercase headlines,
// weight 500, tight leading.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500"],
});

// Body/mono face (V2 — ADR-0003): labels, metadata, captions, and body copy
// — no separate UI sans is loaded.
//
// CLS fix (PF-M2-07): this is the *body* font and it is monospace, so its
// glyph advance drives where every line of body copy wraps. next/font's
// default `swap` display + proportional (Arial-based) adjusted fallback means
// that, on a throttled first load, body copy first paints in the fallback and
// then re-wraps when JetBrains Mono swaps in — the wrapped-line count (and box
// height) of long text changes, shifting all downstream content. It surfaced
// worst on /projects/tiger-kick (154-char `role` string) but affects the whole
// mono body on every route. Because our line-heights are unitless ratios (body
// `line-height:1.7`, Tailwind `leading-*`), vertical line-box height is already
// font-metric-independent, so the *only* CLS vector is this horizontal re-wrap.
//
// Fix = remove the swap entirely with `display: "optional"`: the browser uses
// the fallback if the webfont is not ready within the ~100ms block period and
// never swaps it in for that page view, so no re-wrap can occur -> CLS 0 on all
// routes. The font is self-hosted + preloaded by next/font, so on normal
// connections it still paints from first frame; only a genuinely slow first
// load shows the fallback (then gets the webfont from cache on next nav). The
// fallback is set to a real monospace stack (not the default proportional one)
// so that slow-load fallback stays on-brand for this monospace-body design.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "optional",
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "Liberation Mono",
    "monospace",
  ],
});

// SEO baseline (PF-M3-01). `metadataBase` resolves every relative canonical
// / OG URL against the production origin; the `title.template` lets each
// route set just its page segment (e.g. "About") and inherit the site suffix.
// The root `opengraph-image.tsx` file convention supplies the default OG +
// Twitter image for every route automatically — no per-page image needed.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: "/",
    title: {
      default: SITE_TITLE,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: SITE_TITLE,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-foreground focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
