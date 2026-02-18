import type { Metadata } from "next";

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
      <body className={` bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-300 
      dark:selection:bg-gray-300/15`}>
       
       
          
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 text-slate-900 shadow-[0_22px_70px_-46px_rgba(15,23,42,0.55)] backdrop-blur-lg dark:border-slate-800/60 dark:bg-slate-950/60 dark:text-slate-100 sm:p-8">
                {children}
              </div>
          
           
         
       
        </body>
    </html>
  );
}
