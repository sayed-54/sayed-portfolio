import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sayed Ali",
  description: "My own developed portfolio using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#030303] dark:text-white h-full selection:bg-gray-300 dark:selection:bg-gray-300/15`}
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
              <FloatingLines
                linesGradient={["#E945F5", "#2F4BC0", "#E945F5", "#ffffff", "#f00a0a"]}
                lineCount={[4, 4, 3]}
                animationSpeed={0.85}
                interactive
                bendRadius={5}
                bendStrength={-0.5}
                mouseDamping={0.03}
                parallax
                parallaxStrength={0.35}
                maxPixelRatio={1.5}
                maxFPS={45}
              />
            </div>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-20">
              <div className="rounded-3xl border border-white/20 bg-white/40 p-6 text-gray-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:text-slate-100 sm:p-8">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
