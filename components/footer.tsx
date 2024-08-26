import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Button } from "./ui/button";
import { Github, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-polar py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-6">
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
            <p className="text-astral max-w-2xl">
              <Balancer>
                DigiMedic vytváří digitální páteř pro české zdravotnictví. Naše řešení propojují zdravotnická zařízení, optimalizují procesy a zlepšují péči o pacienty.
              </Balancer>
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <nav className="mb-4 flex flex-col gap-4 md:mb-0">
              <Link href="/privacy-policy" className="text-blumine hover:text-fountain-blue">Zásady ochrany soukromí</Link>
              <Link href="/cookie-policy" className="text-blumine hover:text-fountain-blue">Zásady používání cookies</Link>
            </nav>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="text-blumine hover:text-fountain-blue border border-blumine hover:border-fountain-blue">
                <a href="https://github.com/DigiMedic" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="text-blumine hover:text-fountain-blue border border-blumine hover:border-fountain-blue">
                <a href="https://www.linkedin.com/company/digimedi-cz/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="text-blumine hover:text-fountain-blue border border-blumine hover:border-fountain-blue">
                <a href="https://www.facebook.com/profile.php?id=61556880800899" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-6 border-t border-fountain-blue/30 pt-6 md:flex-row md:items-center md:gap-2">
          <p className="text-astral text-center mx-auto">
            © DigiMedic. Všechna práva vyhrazena. 2024-současnost.
          </p>
        </div>
      </div>
    </footer>
  );
}