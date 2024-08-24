import Link from "next/link"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="w-full pt-8">
      <div className="container flex h-12 items-center justify-between">
        <Link href="/" className="flex items-center pl-4">
          <Image 
            src="/brand/svg/DigiMedic-logo-long.svg"
            alt="DigiMedic Logo" 
            width={200} 
            height={40} 
            className="h-10 w-auto"
            priority
          />
        </Link>
        <Link 
          href="/contact" 
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blumine focus:ring-offset-2 focus:ring-offset-white"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E7F5F8_0%,#1B4D6A_50%,#E7F5F8_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-blumine backdrop-blur-3xl">
            Kontaktujte nás
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </Link>
      </div>
    </header>
  )
}