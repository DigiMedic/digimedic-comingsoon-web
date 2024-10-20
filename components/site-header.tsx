import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="w-full pt-4 -mb-4 relative z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1 overflow-visible">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/svg/DigiMedic-logo-long.svg"
              alt="DigiMedic Logo"
              width={200}
              height={40}
              // Přidáno mt-4 pro větší odsazení shora
              className="h-10 w-auto mt-4"
              style={{ width: "auto" }}
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
