"use client";

import { useState } from "react";
import MobileHamburger from "./MobileHamburger";
import MobileDrawer from "./MobileDrawer";

export default function MobileNavClient({ navLinks }: { navLinks: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MobileHamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileDrawer open={isOpen} onOpenChange={setIsOpen} navLinks={navLinks} />
    </>
  );
} 