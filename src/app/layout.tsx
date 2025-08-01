import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";

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
      <body className="font-proxima-nova antialiased h-full mx-auto flex flex-col bg-[#FCFCFC]">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
