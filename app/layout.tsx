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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
              <main className="rounded-3xl bg-slate-50/90 text-slate-900 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:bg-white/5 dark:text-slate-100 dark:ring-white/10">
                <div className="p-6 sm:p-8">
                  {children}
                </div>
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
        </body>
    </html>
  );
}
