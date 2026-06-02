import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";

// ★ Dynamic import with ssr:false – Three.js is never bundled into the
//   server render, cutting first-paint time and hydration work.
const FloatingLines = dynamic(() => import("./components/FloatingLines"), {
  ssr: false,
  loading: () => null, // canvas mounts client-side; no LCP impact
});

// Display font — bold, geometric, premium feel for headings
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Body font — clean, modern, highly readable
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sayed Ali — Front-End Developer",
  description: "Front-End Developer specializing in Next.js, React & Tailwind CSS. I build fast, accessible, and visually stunning web applications.",
  keywords: ["Sayed Ali", "Front-End Developer", "Next.js", "React", "Tailwind CSS", "Web Developer", "Portfolio"],
  authors: [{ name: "Sayed Ali" }],
  creator: "Sayed Ali",
  openGraph: {
    title: "Sayed Ali — Front-End Developer",
    description: "Front-End Developer specializing in Next.js, React & Tailwind CSS. I build fast, accessible, and visually stunning web applications.",
    url: "https://sayed-portfolio.vercel.app",
    siteName: "Sayed Ali Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayed Ali — Front-End Developer",
    description: "Front-End Developer specializing in Next.js, React & Tailwind CSS.",
    creator: "@Urfav1Slayer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} font-sans bg-white text-black dark:bg-[#0a0a0f] dark:text-white h-full selection:bg-teal-200/60 dark:selection:bg-teal-500/20`}
      >
        <Providers>
          <Navbar />
          <div className="relative min-h-screen">
            {/*
              Fallback gradient – visible while WebGL loads and on devices
              where WebGL fails. Pure CSS → zero GPU cost.
            */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden floating-lines-bg-fallback">
              {/*
                FloatingLines props tuned for performance:
                  • maxPixelRatio={1.5}  → ~44% fewer fragments vs native 2×
                  • maxFPS={45}          → halves GPU work on 90/120 Hz displays
                  • lineCount reduced further (biggest single win)
                  • interactive / parallax off on mobile (handled inside component)
              */}
              
            </div>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-20">
              <div className="rounded-3xl border border-white/20 bg-white/40 p-6 text-gray-900 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:text-slate-100 sm:p-8">
                {children}
              </div>
            </main>
            <Footer />
            {/* Floating WhatsApp CTA — globally available on all pages */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
