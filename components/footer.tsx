import Image from "next/image"
import Link from "next/link"
import { Facebook, Github, Linkedin } from "lucide-react"
import Balancer from "react-wrap-balancer"
import { Button } from "./ui/button"
import { NewsletterForm } from "@/components/NewsletterForm"

export default function Footer() {
  return (
    <footer className="bg-polar py-8 sm:py-12 border-t border-fountain-blue/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/svg/DigiMedic-logo-long.svg"
                alt="DigiMedic Logo"
                width={160}
                height={36}
                className="sm:w-[200px] sm:h-[45px] transition-all hover:opacity-75"
              />
            </Link>
            <p className="max-w-xl text-astral">
              <Balancer>
                DigiMedic vytváří digitální páteř pro české zdravotnictví. Naše
                řešení propojují zdravotnická zařízení, optimalizují procesy a
                zlepšují péči o pacienty.
              </Balancer>
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy-policy"
                className="text-blumine hover:text-fountain-blue"
              >
                Zásady ochrany soukromí
              </Link>
              <Link
                href="/cookie-policy"
                className="text-blumine hover:text-fountain-blue"
              >
                Zásady používání cookies
              </Link>
            </nav>
          </div>

          <div className="flex flex-col justify-between items-end">
            <div className="w-full md:w-auto">
              <div className="text-blumine font-semibold mb-1 text-left mt-4">
                Odebírejte naše novinky
              </div>
              <NewsletterForm />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border border-blumine text-blumine hover:border-fountain-blue hover:text-fountain-blue"
              >
                <a
                  href="https://github.com/DigiMedic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border border-blumine text-blumine hover:border-fountain-blue hover:text-fountain-blue"
              >
                <a
                  href="https://www.linkedin.com/company/digimedi-cz/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="size-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border border-blumine text-blumine hover:border-fountain-blue hover:text-fountain-blue"
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61556880800899"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="size-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="border-fountain-blue/30 mt-8 flex flex-col justify-between gap-6 border-t pt-6 md:flex-row md:items-center md:gap-2">
          <p className="mx-auto text-center text-astral">
            © DigiMedic. Všechna práva vyhrazena. 2024-současnost.
          </p>
        </div>
      </div>
    </footer>
  )
}
