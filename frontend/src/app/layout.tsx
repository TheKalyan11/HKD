import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

import { CmsProvider } from "@/components/CmsContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AIChatbot = dynamic(() => import("@/components/AIChatbot").then(m => m.AIChatbot), { ssr: false });
const AdminControlBar = dynamic(() => import("@/components/AdminControlBar").then(m => m.AdminControlBar), { ssr: false });
const SocialFloatWidget = dynamic(() => import("@/components/SocialFloatWidget").then(m => m.SocialFloatWidget), { ssr: false });

const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Hare Krishna Dharma Trust - Gau Seva & Annadana Seva",
  description: "Offer Gau Seva, Annadana Seva, and Prasadam online at Sri Radha Krishna Dham, Vrindavan. Fast secure donations with automated 80G receipts and WhatsApp updates.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3000'),
  openGraph: {
    title: "Hare Krishna Dharma Trust - Gau Seva & Annadana Seva",
    description: "Support cow protection and food feeding in the holy land of Mathura Vrindavan. Secure tax exemption 80G receipts generated instantly.",
    images: [{ url: '/og-image.jpg' }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://hkmdehradun.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${lora.className} bg-cream-50 antialiased overflow-x-hidden max-w-[100vw] w-full`}>
        <CmsProvider>
          {/* Header Navigation */}
          <Navbar />
          
          {/* Page Contents */}
          <main className="pt-0 min-h-screen bg-cream/20">
            {children}
          </main>
          
          {/* Bottom Footer */}
          <Footer />

          {/* Floated Support Overlays */}
          <AIChatbot />
          <AdminControlBar />
          <SocialFloatWidget />
        </CmsProvider>
      </body>

    </html>
  );
}
