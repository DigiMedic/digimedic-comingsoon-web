import "@/styles/globals.css"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import DotPattern from "@/components/magicui/dot-pattern"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Footer from '@/components/footer';
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "DigiMedic Blog",
  description: "Nejnovější články a novinky ze světa digitálního zdravotnictví",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-polar font-raleway text-blumine antialiased"
        )}
      >
        <SiteHeader />
        <ClientLayout>
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
        </ClientLayout>
        <Footer />
        <TailwindIndicator />
      </body>
    </html>
  )
}