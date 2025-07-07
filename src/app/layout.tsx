import type { Metadata } from "next";
import { Azeret_Mono, Victor_Mono, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { FontProvider } from "@/components/font-provider";
import { WindowsProvider } from "@/contexts/WindowsContext";

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-azeret-mono",
});

const victorMono = Victor_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-victor-mono",
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-noto-sans-mono",
});

export const metadata: Metadata = {
  title: "Dashboard Pro",
  description: "A professional dashboard built with Next.js and ShadCN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${azeretMono.variable} ${victorMono.variable} ${notoSansMono.variable} dark`} suppressHydrationWarning>
      <body className="antialiased">
        <FontProvider>
          <WindowsProvider>
            <MainLayout>{children}</MainLayout>
          </WindowsProvider>
        </FontProvider>
      </body>
    </html>
  );
}
