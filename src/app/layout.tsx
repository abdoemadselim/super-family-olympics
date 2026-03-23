import type { Metadata } from "next";
import { Marhey, Cairo } from "next/font/google";
import "./globals.css";

const marhey = Marhey({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-marhey",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "سوبر أولمبياد العائلة",
  description: "لعبة مسابقات عائلية تفاعلية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`h-full ${marhey.variable} ${cairo.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
