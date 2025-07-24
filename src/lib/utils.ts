import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeImageUrl(url: string): string {
  if (!url) return url
  
  let normalizedUrl = url
  
  // Fix Supabase URL format issue: convert storage.supabase.co to supabase.co/storage/
  if (normalizedUrl.includes('.storage.supabase.co/v1/object/public/')) {
    normalizedUrl = normalizedUrl.replace(
      /https:\/\/([^.]+)\.storage\.supabase\.co\/v1\/object\/public\//,
      'https://$1.supabase.co/storage/v1/object/public/'
    )
  }
  
  // Split on :// to preserve the protocol
  const parts = normalizedUrl.split('://')
  if (parts.length === 2) {
    // Has protocol (https://, http://, etc.)
    const [protocol, rest] = parts
    // Collapse all consecutive slashes in the rest of the URL
    const normalizedRest = rest.replace(/\/+/g, '/')
    normalizedUrl = `${protocol}://${normalizedRest}`
  } else {
    // No protocol, just collapse consecutive slashes
    normalizedUrl = normalizedUrl.replace(/\/+/g, '/')
  }
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development' && url !== normalizedUrl) {
    console.log('🔧 URL normalized:', url, '→', normalizedUrl)
  }
  
  return normalizedUrl
}
