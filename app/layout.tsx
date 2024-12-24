import "styles/globals.css"
import { Metadata } from "next"
import { SiteHeader } from "components/site-header"
import dynamic from "next/dynamic"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import ErrorBoundary from "components/ErrorBoundary"
import Footer from "components/footer"
import UmamiAnalytics from "@/components/Analytics"

const DigiMedicNavigation = dynamic(
  () => import("components/navbar-menu").then((mod) => mod.DigiMedicNavigation),
  { ssr: false }
)

export const metadata: Metadata = {
  metadataBase: new URL("https://www.digimedic.cz"),
  title: {
    default: "DigiMedic Blog",
    template: "%s | DigiMedic",
  },
  description: "Nejnovější články a novinky ze světa digitálního zdravotnictví",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://www.digimedic.cz",
    siteName: "DigiMedic",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="min-h-screen bg-white">
        <ErrorBoundary>
          <SiteHeader />
          <main className="pt-16 min-h-screen">
            <DigiMedicNavigation />
            {children}
            <Footer />
          </main>
          <VercelAnalytics />
          <UmamiAnalytics />
        </ErrorBoundary>
      </body>
    </html>
  )
}
