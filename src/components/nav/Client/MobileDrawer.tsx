"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

interface NavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileDrawer({ open, onOpenChange }: NavDrawerProps) {
  // Define mobile-specific navigation links
  const mobileNavLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "App", href: "/forecaddi" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <button className="relative w-6 h-6"></button>
      </DrawerTrigger>
      <DrawerContent onCloseAutoFocus={(event: Event) => event.preventDefault()}>
        <div className="mx-auto w-full max-w-sm">
          <div className="pb-8 pt-2 min-h-[250px] relative px-8 xs:px-0">
            <nav>
              <ul className="space-y-4 pt-6">
                {mobileNavLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} onClick={() => onOpenChange(false)}>
                      <DrawerTitle className="text-caddi-black text-lg hover:text-caddi-brown transition-colors">{link.label}</DrawerTitle>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <DrawerFooter>
            <DrawerClose asChild></DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 