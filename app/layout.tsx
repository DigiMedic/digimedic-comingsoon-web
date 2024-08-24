import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import DotPattern from "@/components/magicui/dot-pattern"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E7F5F8" }, // Polar color from DigiMedic palette
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-polar font-raleway text-blumine antialiased"
        )}
      >
        <SiteHeader />
        <main className="relative flex min-h-screen flex-col pt-20">{/* Přidáno padding-top pro zabránění překrytí */}
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