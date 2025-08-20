import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import { Toaster } from '@/components/ui/sonner'
import { CookieConsent } from '@/components/ui/cookie-consent'

export const metadata: Metadata = {
  title: "Caddi AI Inc.",
  description: "Download the Forecaddie App Now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className='h-full mx-auto '>
      <head>
        {/* Preconnect to font origins for faster loading */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        
        {/* Preload font stylesheet for faster loading */}
        <link rel="preload" as="style" href="https://use.typekit.net/eaa4cih.css" />
        <link rel="stylesheet" href="https://use.typekit.net/eaa4cih.css" />
      </head>
      <body className="font-proxima-nova antialiased h-full mx-auto flex flex-col bg-[#FCFCFC] overflow-x-hidden">
        <Navigation />
        <div className="pt-[76px] md:pt-[68px] flex-1 flex flex-col" id="main-content">
          {children}
        </div>
        <Toaster position="bottom-right" />
        <CookieConsent />
        <Footer />
        <div id="drawer-portal"></div>
      </body>
    </html>
  );
}
