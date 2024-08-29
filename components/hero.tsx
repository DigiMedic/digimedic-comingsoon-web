"use client"
import { cn } from "@/lib/utils"
import DotPattern from "@/components/magicui/dot-pattern"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex flex-col items-center">
        <div className="text-center max-w-3xl">
          <h1 className="scroll-m-20 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blumine mb-2">
            Digitální páteř pro české zdravotnictví
          </h1>
          <p className="mt-2 text-base sm:text-lg text-astral font-raleway mb-3">
            Naše webové stránky jsou právě ve vývoji. Pracujeme na tom, abychom vám brzy mohli představit kompletní online prezentaci. Připojte se k nám na cestě k efektivnější a dostupnější zdravotní péči.
          </p>
        </div>
        <div className="mt-4 sm:mt-6 w-full max-w-lg">
          <form className="relative z-10">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-2 border bg-background rounded-lg shadow-sm">
              <div className="flex-grow">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full"
                  placeholder="Váš email pro novinky"
                  required
                  aria-label="Váš email pro novinky"
                />
              </div>
              <div className="flex-shrink-0">
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto bg-blumine text-white border border-blumine hover:bg-white hover:text-blumine transition-colors duration-200"
                >
                  Zůstaňte informováni
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DotPattern
        width={16}
        height={16}
        cx={1}  
        cy={1}
        cr={1}
        className={cn(
          "absolute inset-0 h-full w-full [mask-image:radial-gradient(white,transparent_85%)]",
          "text-blumine/6"
        )}
      />
    </div>
  )
}

export default Hero