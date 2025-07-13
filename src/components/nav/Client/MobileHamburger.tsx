"use client";

type MobileHamburgerProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function MobileHamburger({ isOpen, setIsOpen }: MobileHamburgerProps) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="p-2 mt-1"
      aria-label="Toggle mobile menu"
    >
      <div className="relative w-6 h-6 ">
        <span className={`rounded-full absolute block h-[2.5px] bg-[#2F415B] transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-0 w-full left-0"}`}></span>
        <span className={`rounded-full absolute block h-[2.5px] bg-[#2F415B] transition-all duration-300 origin-center top-[8px] w-full right-0 ${isOpen ? "rotate-45" : ""}`}></span>
        <span className={`rounded-full absolute block h-[2.5px] bg-[#2F415B] transition-all duration-300 origin-center top-[8px] w-full right-0 ${isOpen ? "-rotate-45" : ""}`}></span>
        <span className={`rounded-full absolute block h-[2.5px] bg-[#2F415B] transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-[16px] w-1/2 left-0"}`}></span>
      </div>
    </button>
  );
} 