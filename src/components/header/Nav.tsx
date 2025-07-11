import React from "react";
import CaddiLogo from "@/components/logos/Caddi";
import ShoppingBag from "@/components/icons/ShoppingBag";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Shop", hasDropdown: true },
  { label: "App", hasDropdown: true },
  { label: "About", hasDropdown: false },
  { label: "Contact", hasDropdown: false },
];

export default function Nav({ className }: { className?: string }) {
  return (
    <nav className='w-full py-2 px-2'>

      <div className={`flex items-center justify-between ${className}`}>
        {/* Logo */}
        <div className="flex items-center">
          <CaddiLogo className="h-14 w-auto" />
        </div>
        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="flex items-center text-base font-semibold text-caddi-black"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown
                  className="ml-1 mt-1 h-4 w-4 text-caddi-black/40"/>
              )}
            </div>
          ))}
        </div>
        {/* Download Button & Cart */}
        <div className="flex items-center gap-4">
          <button
            className="bg-caddi-blue text-white text-base font-semibold font-sans rounded-full px-6 py-2 hover:bg-caddi-blue/90 transition-colors cursor-pointer ease-in-out-quad duration-100"
    
          >
            Download App
          </button>
          <button className="transition-all 
          cursor-pointer duration-100 group ease-in-out-quad">
            <ShoppingBag className="h-9 w-9 text-caddi-blue group-hover:text-caddi-brown transition-all duration-100 ease-in-out-quad" />
          </button>
        </div>
      </div>
    </nav>
  );
}
