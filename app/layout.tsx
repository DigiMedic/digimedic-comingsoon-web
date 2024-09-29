import "@/styles/globals.css"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import DotPattern from "@/components/magicui/dot-pattern"
import dynamic from 'next/dynamic'
import { spaceMono, raleway, openSans } from './fonts'
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from "@/components/footer";

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
        <SiteHeader />
        <DigiMedicNavigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
