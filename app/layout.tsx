import "@/styles/globals.css"

import { Metadata } from "next"

import { cn } from "@/lib/utils"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import DotPattern from "@/components/magicui/dot-pattern"

import ClientLayout from "./ClientLayout"
import FormbricksProvider from "./formbricks"; // Ujistěte se, že cesta je správná

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "DigiMedic Blog",
    description:
      "Nejnovější články a novinky ze světa digitálního zdravotnictví",
  }
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Raleway&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen font-raleway text-blumine antialiased relative"
        )}
      >
        <DotPattern className="fixed inset-0 z-[-1] opacity-20" width={20} height={20} cx={1} cy={1} cr={1} />
        <div className="relative z-10 min-h-screen">
          <SiteHeader />
          <ClientLayout>
            <main className="relative flex min-h-screen flex-col pt-20">
              <div className="flex-1">{children}</div>
            </main>
          </ClientLayout>
          <Footer />
          <TailwindIndicator />
          <FormbricksProvider /> {/* Zde je komponenta zahrnuta */}
        </div>
      </body>
    </html>
  )
}

export default RootLayout;