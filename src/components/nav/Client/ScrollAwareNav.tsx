"use client"

import { useState, useEffect } from "react"

interface ScrollAwareNavProps {
  children: React.ReactNode
}

export default function ScrollAwareNav({ children }: ScrollAwareNavProps) {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setHasScrolled(scrollY > 0)
    }

    // Set initial scroll state
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`w-full py-4 md:py-2 fixed top-0 left-0 right-0 z-[100] bg-[#FCFCFC] transition-all duration-200 ${
      hasScrolled ? "shadow-sm border-b border-gray-100" : ""
    }`}>
      {children}
    </nav>
  )
}