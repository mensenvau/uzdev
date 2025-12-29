import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./style/globals.css";

export const metadata: Metadata = {
  title: "Uzdev",
  description: "A modern web application built with Next.js and shadcn/ui",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="background-grid" />
        {children}
        <Toaster richColors theme="light" position="top-right" toastOptions={{ classNames: { toast: "shadow-lg border border-black/5" } }} />
      </body>
    </html>
  );
}
