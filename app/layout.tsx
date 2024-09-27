import "@/styles/globals.css"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import DotPattern from "@/components/magicui/dot-pattern"
import dynamic from 'next/dynamic'
import { spaceMono, raleway, openSans } from './fonts'
import { Analytics } from '@vercel/analytics/react';

const DigiMedicNavigation = dynamic(() => import('@/components/navbar-menu').then(mod => mod.DigiMedicNavigation), { ssr: false })

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "DigiMedic Blog",
    description: "Nejnovější články a novinky ze světa digitálního zdravotnictví",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning className={`${spaceMono.variable} ${raleway.variable} ${openSans.variable}`}>
      <body className={cn("min-h-screen font-raleway text-blumine antialiased relative")}>
        <DotPattern className="fixed inset-0 z-[-1] opacity-20" width={20} height={20} cx={1} cy={1} cr={1} />
        <div className="relative z-10 min-h-screen">
          <SiteHeader />
          <DigiMedicNavigation />
          <main className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </main>
          <Footer />
          <TailwindIndicator />
          <Analytics />
        </div>
      </body>
    </html>
  )
}
