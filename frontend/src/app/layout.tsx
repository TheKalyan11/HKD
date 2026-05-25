import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CmsProvider } from "@/components/CmsContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";
import { AdminControlBar } from "@/components/AdminControlBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hare Krishna Dharma Trust - Gau Seva & Annadana Seva",
  description: "Offer Gau Seva, Annadana Seva, and Prasadam online at Sri Radha Krishna Dham, Vrindavan. Fast secure donations with automated 80G receipts and WhatsApp updates.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
      <body className={`${inter.className} bg-cream-50 antialiased`}>
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
        </CmsProvider>
      </body>
    </html>
  );
}
