import type { Metadata, Viewport } from "next";
import { Playpen_Sans_Arabic, Cairo } from "next/font/google";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import "./globals.css";

const playpenSansArabic = Playpen_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-playpen",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "سوبر أولمبياد العائلة",
  description: "لعبة مسابقات عائلية تفاعلية",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "أولمبياد العائلة",
  },
};

export const viewport: Viewport = {
  themeColor: "#3aaa9e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`h-full ${playpenSansArabic.variable} ${cairo.variable}`}>
      <body className="min-h-full">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
