import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/cart/CartDrawer";

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
    <html lang="en" className='h-full mx-auto'>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/eaa4cih.css" />
      </head>
      <body className="font-proxima-nova antialiased h-full mx-auto flex flex-col">
        <CartProvider>
          <Navigation />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
