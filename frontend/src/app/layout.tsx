import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";

import { CmsProvider } from "@/components/CmsContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AdminControlBar = dynamic(() => import("@/components/AdminControlBar"), { ssr: false });
const SocialFloatWidget = dynamic(() => import("@/components/SocialFloatWidget"), { ssr: false });
const FloatingReelsWidget = dynamic(() => import("@/components/FloatingReelsWidget"), { ssr: false });

export const metadata: Metadata = {
  title: "Hare Krishna Dharma Trust - Gau Seva & Annadana Seva",
  description: "Offer Gau Seva, Annadana Seva, and Prasadam online at Sri Radha Krishna Dham, Vrindavan. Fast secure donations with automated 80G receipts and WhatsApp updates.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3000'),
  openGraph: {
    title: "Hare Krishna Dharma Trust - Gau Seva & Annadana Seva",
    description: "Support cow protection and food feeding in the holy land of Mathura Vrindavan. Secure tax exemption 80G receipts generated instantly.",
    images: [{ url: '/og-image.webp' }]
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream-50 antialiased overflow-x-clip max-w-[100vw] w-full">
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
          <Script id="chatling-config" strategy="lazyOnload">
            {`window.chtlConfig = { chatbotId: "2451993731" }`}
          </Script>
          <Script async data-id="2451993731" id="chtl-script" type="text/javascript" src="https://chatling.ai/js/embed.js" strategy="lazyOnload" />
          <AdminControlBar />
          <SocialFloatWidget />
          <FloatingReelsWidget />
        </CmsProvider>
      </body>

    </html>
  );
}
