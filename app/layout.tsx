import 'styles/globals.css'
import { Metadata } from "next"
import { SiteHeader } from 'components/site-header'
import dynamic from 'next/dynamic'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import ErrorBoundary from 'components/ErrorBoundary'
import Footer from 'components/footer'
import UmamiAnalytics from '@/components/Analytics';

const DigiMedicNavigation = dynamic(() => import('components/navbar-menu').then(mod => mod.DigiMedicNavigation), { ssr: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digimedic.cz'),
  title: {
    default: "DigiMedic Blog",
    template: "%s | DigiMedic"
  },
  description: "Nejnovější články a novinky ze světa digitálního zdravotnictví",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://www.digimedic.cz',
    siteName: 'DigiMedic',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <UmamiAnalytics />
      </head>
      <body>
        <ErrorBoundary>
          <SiteHeader />
          <DigiMedicNavigation />
          <main>{children}</main>
          <Footer />
          <VercelAnalytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
