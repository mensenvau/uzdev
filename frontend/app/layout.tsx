import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./style/globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Uzdev",
  description: "A modern web application built with Next.js and shadcn/ui",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={grotesk.className}>
        <div className="background-grid" />
        {children}
        <Toaster richColors theme="light" position="top-right" toastOptions={{ classNames: { toast: "shadow-lg border border-black/5" } }} />
      </body>
    </html>
  );
}
