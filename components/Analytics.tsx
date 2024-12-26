"use client"

import Script from "next/script"

export default function Analytics() {
  const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://umami.digimedic.dev'
  
  if (!UMAMI_URL) {
    console.warn('NEXT_PUBLIC_UMAMI_URL není nastaveno')
    return null
  }

  return (
    <Script
      defer
      src={`${UMAMI_URL}/script.js`}
      data-website-id="fdf06559-4cb9-46b4-b35b-758e035aa583"
      strategy="afterInteractive"
    />
  )
}
