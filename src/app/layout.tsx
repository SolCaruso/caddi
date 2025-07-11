import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/nav/Navigation";

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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/eaa4cih.css" />
      </head>
      <body className="font-proxima-nova antialiased">
        <Navigation className='max-w-8xl mx-auto'/>
        {children}
      </body>
    </html>
  );
}
