import "@/styles/globals.css"
import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import dynamic from 'next/dynamic'
import { Analytics } from '@vercel/analytics/react'
import ErrorBoundary from '@/components/ErrorBoundary'
import Footer from "@/components/footer"

const DigiMedicNavigation = dynamic(() => import('@/components/navbar-menu').then(mod => mod.DigiMedicNavigation), { ssr: false })

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "DigiMedic Blog",
    description: "Nejnovější články a novinky ze světa digitálního zdravotnictví",
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <ErrorBoundary>
          <SiteHeader />
          <DigiMedicNavigation />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
