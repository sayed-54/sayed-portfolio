import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import FloatingLines from "./components/FloatingLines";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sayed Ali",
  description: "My own developed portfolio using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black dark:bg-[#030303] dark:text-white h-full selection:bg-gray-300 
      dark:selection:bg-gray-300/15`}>
        <Providers>
          <Navbar />
          <div className="relative min-h-screen">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
               <FloatingLines
                linesGradient={["#E945F5", "#2F4BC0", "#E945F5", "#ffffff", "#f00a0a"]}
                animationSpeed={1}
                interactive
                bendRadius={5}
                bendStrength={-0.5}
                mouseDamping={0.03}
                parallax
                parallaxStrength={0.45}
              />
            </div>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-20">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-slate-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:text-slate-100 sm:p-8">
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
