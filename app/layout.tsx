"use client";

import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import DotPattern from "@/components/magicui/dot-pattern"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Footer from '@/components/footer';
import { Menu } from "@/components/navbar-menu";
import { useState } from "react";
import { DigiMedicNavigation } from "@/components/navbar-menu";

// Odstraň tento řádek: export const metadata: Metadata = { ... }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <html lang="cs" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-polar font-raleway text-blumine antialiased"
        )}
      >
        <SiteHeader />
        <DigiMedicNavigation />
        <main className="relative flex min-h-screen flex-col pt-20">
          <div className="flex-1">{children}</div>
          <DotPattern
            width={20}
            height={20}
            cx={1}  
            cy={1}
            cr={1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
            )}
          />
        </main>
        <Footer />
        <TailwindIndicator />
      </body>
    </html>
  )
}