"use client";

import { useState } from "react";
import MobileHamburger from "@/components/nav/Client/MobileHamburger";
import MobileDrawer from "@/components/nav/Client/MobileDrawer";

export default function MobileNavClient({ navLinks }: { 
  navLinks: Array<{
    label: string;
    href?: string;
    dropdown?: Array<{
      label: string;
      href: string;
      description?: string;
      featured?: boolean;
      icon?: string;
    }>;
  }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MobileHamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileDrawer open={isOpen} onOpenChange={setIsOpen} navLinks={navLinks} />
    </>
  );
} 