"use client";

import { useState } from "react";
import MobileHamburger from "@/components/nav/Client/MobileHamburger";
import MobileDrawer from "@/components/nav/Client/MobileDrawer";

export default function MobileNavClient() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MobileHamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileDrawer open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
} 