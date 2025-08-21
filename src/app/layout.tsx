import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import { Toaster } from '@/components/ui/sonner'
import { CookieConsent } from '@/components/ui/cookie-consent'

export const metadata: Metadata = {
  title: {
    default: "Caddi AI Inc. - Premium Golf Divot Tools & App",
    template: "%s | Caddi AI Inc."
  },
  description: "Premium golf divot tools crafted from exotic hardwoods. Download the Forecaddie app for advanced golf course management and scoring.",
  keywords: ["golf divot tools", "exotic hardwood", "golf accessories", "forecaddie app", "golf course management", "premium golf tools"],
  authors: [{ name: "Caddi AI Inc." }],
  creator: "Caddi AI Inc.",
  publisher: "Caddi AI Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://caddi.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://caddi.ai',
    title: 'Caddi AI Inc. - Premium Golf Divot Tools & App',
    description: 'Premium golf divot tools crafted from exotic hardwoods. Download the Forecaddie app for advanced golf course management and scoring.',
    siteName: 'Caddi AI Inc.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Caddi AI Inc. - Premium Golf Divot Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caddi AI Inc. - Premium Golf Divot Tools & App',
    description: 'Premium golf divot tools crafted from exotic hardwoods. Download the Forecaddie app for advanced golf course management and scoring.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className='h-full'>
      <head>
        {/* Preconnect to font origins for faster loading */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        
        {/* Preconnect to Supabase for faster image loading */}
        <link rel="preconnect" href="https://zcvltuokjgqfjpqynyrg.supabase.co" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        
        {/* Preload font stylesheet for faster loading */}
        <link rel="preload" as="style" href="https://use.typekit.net/eaa4cih.css" />
        <link rel="stylesheet" href="https://use.typekit.net/eaa4cih.css" />
      </head>
      <body className="font-proxima-nova antialiased min-h-screen flex flex-col bg-[#FCFCFC] overflow-x-hidden">
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
