import Image from "next/image"
import Link from "next/link"
import { ContactButton } from "@/components/ContactButton"

export function SiteHeader() {
  return (
    <header className="w-full pt-2 -mb-4 relative z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1 overflow-visible">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/svg/DigiMedic-logo-long.svg"
              alt="DigiMedic Logo"
              width={200}
              height={40}
              className="h-10 w-auto"
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <Link
            href="/blog"
            className="mr-4 text-blumine hover:text-fountain-blue"
          >
            Blog
          </Link>
          <ContactButton href="/contact" />
        </div>
      </div>
    </header>
  )
}