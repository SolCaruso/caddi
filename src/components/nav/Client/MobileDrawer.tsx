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
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface NavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: any[];
}

export default function MobileDrawer({ open, onOpenChange, navLinks }: NavDrawerProps) {
  const [menu, setMenu] = React.useState<string | null>(null);

  // Custom handler to manage menu reset timing
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setTimeout(() => setMenu(null), 250);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button className="relative w-6 h-6"></button>
      </DrawerTrigger>
      <DrawerContent onCloseAutoFocus={(event: Event) => event.preventDefault()}>
        <div className="mx-auto w-full max-w-sm">
          <div className="pr-4 pl-10 pb-12 pt-8 min-h-[230px] relative">
            <nav>
              <AnimatePresence initial={false} mode="wait">
                <motion.ul
                  key="main"
                  className="space-y-4 pt-6"
                  initial={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
                >
                  {navLinks.map((link) =>
                    link.dropdown ? (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() => setMenu(link.label)}
                          className="w-full text-left"
                        >
                          <DrawerTitle className="text-caddi-black hover:text-caddi-brown transition-colors">{link.label}</DrawerTitle>
                        </button>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link href={link.href || "#"} onClick={() => onOpenChange(false)}>
                          <DrawerTitle className="text-caddi-black hover:text-caddi-brown transition-colors">{link.label}</DrawerTitle>
                        </Link>
                      </li>
                    )
                  )}
                </motion.ul>
                {navLinks.map(
                  (link) =>
                    menu === link.label && (
                      <>
                        <ChevronLeft
                          onClick={() => setMenu(null)}
                          className="absolute top-2 left-0 text-caddi-black z-10 cursor-pointer"
                        />
                        <motion.ul
                          key={link.label}
                          className="space-y-4 pt-4"
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 50, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
                        >
                          {link.dropdown.map((item: any) => (
                            <li key={item.label} className="flex items-start space-x-2">
                              <Link href={item.href || "#"} onClick={() => onOpenChange(false)}>
                                <DrawerTitle className="text-caddi-black hover:text-caddi-brown transition-colors">{item.label}</DrawerTitle>
                                {item.description && (
                                  <div className="text-xs text-caddi-black/70 mt-1">{item.description}</div>
                                )}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      </>
                    )
                )}
              </AnimatePresence>
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