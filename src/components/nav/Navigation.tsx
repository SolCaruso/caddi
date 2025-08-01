import React from "react";
import Logo from "@/components/logos/Caddi";
import DesktopMenu from "./DesktopMenu";
import DownloadButton from "./DownloadButton";
import CartButton from "./Client/CartButton";
import MobileNavClient from "./Client/MobileNavClient";
import { Container } from "@/components/ui/container";

// Nav Links
export const navLinks = [
  {
    label: "Shop",
    dropdown: [
      {
        label: "Build Your Own",
        href: "/build",
        description: "Craft your own premium hardwood divot tool by hand.",
        featured: true,
      },
      {
        label: "Shop All",
        href: "/shop",
        description: "Browse the full collection of handcrafted golf tools and accessories.",
      },
      {
        label: "Divot Tools",
        href: "/shop",
        description: "Premium hardwood divot tools — expertly finished and ready to ship.",
      },
      {
        label: "Custom Work",
        href: "/",
        description: "Unique, one-off pieces and personalized creations made to order.",
      },
    ],
  },
  {
    label: "App",
    dropdown: [
      {
        label: "Forecaddie Golf App",
        href: "/forecaddi",
        description: "Track rounds, stats, and performance with our digital caddie.",
      },
      {
        label: "App Instructions",
        href: "/forecaddi",
        description: "Quick start guide and tips to get the most out of the app.",
      },
    ],
  },
  {
    label: "Contact",
    href: "/",
  },
  {
    label: "Info",
    dropdown: [
      {
        label: "About",
        href: "#",
        icon: "contact",
      },
      {
        label: "Terms of Service",
        href: "#",
        icon: "terms",
      },
      {
        label: "Cookies Settings",
        href: "#",
        icon: "cookies",
      },
    ],
  },
];

export default function Navigation() {
  return (
    <nav className="w-full py-4 md:py-2 relative z-10 bg-[#FCFCFC]">
      <Container>
        <div className="flex items-center justify-between">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center w-full">
            {/* Left Section */}
            <div className="flex items-center justify-start w-1/3">
              <Logo className="h-12 w-auto -ml-2 hover:opacity-80 transition-all duration-100 ease-in-out-quad cursor-pointer"/>
            </div>
            
            {/* Center Section - Navigation Menu */}
            <div className="flex items-center justify-center w-1/3">
              <DesktopMenu navLinks={navLinks} />
            </div>
            
            {/* Right Section */}
            <div className="flex items-center justify-end w-1/3 gap-4">
              <DownloadButton />
              <CartButton />
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="flex md:hidden items-center w-full">
            {/* Hamburger (left) */}
            <div className="flex items-center">
              <MobileNavClient navLinks={navLinks} />
            </div>
            {/* Logo (center) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Logo className="h-12 w-auto hover:opacity-80 transition-all duration-100 ease-in-out-quad cursor-pointer"/>
            </div>
            {/* Cart Button (right) */}
            <div className="flex items-center ml-auto">
              <CartButton/>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
} 