"use client"

import { useEffect, useState } from 'react';

export default function DownloadButton() {
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  useEffect(() => {
    // Detect user's platform
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';
    
    // Check for iOS, Mac, or iPad
    const isAppleDevice = 
      /iphone|ipad|ipod/.test(userAgent) || 
      /mac/.test(platform) || 
      /macintosh/.test(userAgent) ||
      (navigator.maxTouchPoints > 1 && /mac/.test(platform)); // iPad on macOS

    if (isAppleDevice) {
      setDownloadUrl('https://apps.apple.com/us/app/forecaddie-golf-app/id6740142793');
    } else {
      // Default to Google Play for Android/Windows/other platforms
      setDownloadUrl('https://play.google.com/store/apps/details?id=com.caddiai.forecaddie.android');
    }
  }, []);

  // Fallback to Apple App Store if no URL is set yet (SSR)
  const href = downloadUrl || 'https://apps.apple.com/us/app/forecaddie-golf-app/id6740142793';

  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-caddi-blue text-white text-base font-semibold font-sans rounded-full px-6 py-2 hover:bg-caddi-blue/90 transition-colors cursor-pointer ease-in-out-quad duration-100"
      aria-label="Download Forecaddie golf app"
    >
      Download App
    </a>
  );
} 