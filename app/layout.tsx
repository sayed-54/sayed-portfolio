import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import Aurora from "./components/Aurora";

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
      <body className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-300 
      dark:selection:bg-gray-300/15`}>
        <Providers>
          <Navbar />
          <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <Aurora
                colorStops={["#5227FF", "#7cff67", "#652020", "#d4f23a"]}
                amplitude={1.7}
                blend={0.55}
              />
            </div>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 text-slate-900 shadow-[0_22px_70px_-46px_rgba(15,23,42,0.55)] backdrop-blur-lg dark:border-slate-800/60 dark:bg-slate-950/60 dark:text-slate-100 sm:p-8">
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
