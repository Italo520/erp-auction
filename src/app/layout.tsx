import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Leilões 083 Admin",
  description: "A comprehensive admin dashboard for managing vehicle auctions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${notoSans.variable} font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}