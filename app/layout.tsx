import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aekkarat Fontong — Software / QA Automation Engineer",
  description:
    "Portfolio of Aekkarat Fontong (Jod), Software / QA Automation Engineer.",
};

// Sets the correct `.dark` class on <html> before first paint (no-FOUC).
//
// IMPORTANT: this must be a plain native <script> rendered directly in
// JSX (see below), NOT next/script. Verified against this build
// (Next 16 / Turbopack, App Router): `next/script strategy="beforeInteractive"`
// does NOT emit a synchronous inline <script> here — its body is queued
// via `self.__next_s.push(...)` and drained by framework chunks that load
// `async`, i.e. *after* first paint. A plain <script> with
// dangerouslySetInnerHTML is rendered by React/Next as a literal,
// synchronous inline <script> tag in the HTML, which the browser executes
// as soon as the parser reaches it — before it parses/paints anything
// after it in the document. Placing it as the first child of <body>
// (before the skip link, Header, and {children}) makes it run before any
// visible content paints.
const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The inline theme script (above) mutates classList before React
      // hydrates, so the server-rendered class list and the live DOM can
      // legitimately differ at hydration time. This is the standard,
      // documented way to avoid a false-positive hydration warning for
      // exactly this pattern.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
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
