"use client"

import Script from "next/script"

export default function Analytics() {
  return (
    <Script
      defer
      src="http://umami-zgwccgo44s8g04840wscokg8.194.164.72.131.sslip.io/script.js"
      data-website-id="fdf06559-4cb9-46b4-b35b-758e035aa583"
      strategy="afterInteractive"
    />
  )
}
