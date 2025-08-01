"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ScrollHandler() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo')
    
    if (scrollTo === 'explore-the-app') {
      // Add a small delay to ensure the page has fully loaded
      setTimeout(() => {
        const element = document.getElementById('explore-the-app')
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  }, [searchParams])

  // This component doesn't render anything
  return null
}