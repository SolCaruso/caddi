import React from "react";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import DownloadButton from "./DownloadButton";
import CartButton from "./CartButton";
import MobileNavClient from "./Client/MobileNavClient";

// Nav Links
const navLinks = [
  {
    label: "Shop",
    dropdown: [
      {
        label: "Build Your Own",
        href: "/",
        description: "Craft your own premium hardwood divot tool by hand.",
        featured: true,
      },
      {
        label: "Shop All",
        href: "/",
        description: "Browse the full collection of handcrafted golf tools and accessories.",
      },
      {
        label: "Divot Tools",
        href: "/",
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
        href: "#",
        description: "Track rounds, stats, and performance with our digital caddie.",
      },
      {
        label: "App Instructions",
        href: "#",
        description: "Quick start guide and tips to get the most out of the app.",
      },
    ],
  },
  {
    label: "About",
    href: "/",
  },
  {
    label: "More",
    dropdown: [
      {
        label: "Contact",
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

export default function Navigation({ className, padding }: { className?: string; padding?: string }) {
  return (
    <nav className={`w-full py-2 ${padding}`}>
      <div className={`flex items-center justify-between ${className}`}>
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>
        {/* NavigationMenu (center, desktop only) */}
        <div className="flex-1 items-center justify-center md:flex hidden">
          <DesktopMenu navLinks={navLinks} />
        </div>
        {/* Download Button & Cart (desktop only) */}
        <div className="items-center gap-4 md:flex hidden">
          <DownloadButton />
          <CartButton />
        </div>
        {/* Hamburger and Drawer (mobile only) */}
        <div className="flex md:hidden items-center ml-auto">
          <MobileNavClient navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
} 