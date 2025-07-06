import type { Metadata } from "next";
import { Victor_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

const victorMono = Victor_Mono({
  subsets: ["latin"],
  variable: "--font-victor-mono",
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
    <html lang="en" className="dark">
      <body className={`${victorMono.variable} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
