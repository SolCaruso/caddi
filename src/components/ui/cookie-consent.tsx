"use client"

import { useEffect } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

const COOKIE_CONSENT_KEY = 'caddi-cookie-consent'

export function CookieConsent() {
  useEffect(() => {
    // Check if user has already seen the cookie notice
    const hasSeenConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    
    if (!hasSeenConsent) {
      // Small delay to ensure page has loaded
      const timer = setTimeout(() => {
        toast(
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2 flex-1">
              
              <span>This site uses cookies to deliver its services and analyze traffic.</span><Link 
                href="/cookie-policy" 
                className="text-caddi-blue hover:text-caddi-brown  transition-colors whitespace-nowrap cursor-pointer"
                onClick={() => {
                  localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
                }}
              >
                Learn more
              </Link>
            </div>
          </div>,
          {
            duration: 5000, // 5 seconds
            position: 'bottom-right',
            onAutoClose: () => {
              localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
            },
            onDismiss: () => {
              localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
            }
          }
        )
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  return null
}