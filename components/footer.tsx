import Image from "next/image"
import Link from "next/link"
import { Facebook, Github, Linkedin } from "lucide-react"
import Balancer from "react-wrap-balancer"
import { Button } from "./ui/button"
import { NewsletterForm } from '@/components/NewsletterForm'

export default function Footer() {
  return (
    <footer className="bg-polar py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <span className="sr-only">DigiMedic</span>
              <Image
                src="/brand/svg/DigiMedic-logo-long.svg"
                alt="DigiMedic Logo"
                width={200}
                height={45}
                className="transition-all hover:opacity-75"
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
            <div className="mb-6 w-full md:w-auto">
              <h3 className="text-blumine font-semibold mb-2">Odebírejte naše novinky</h3>
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
                  <Github className="h-5 w-5" />
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
                  <Linkedin className="h-5 w-5" />
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
                  <Facebook className="h-5 w-5" />
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