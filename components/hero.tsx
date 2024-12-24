"use client"

import HyperText from "@/components/magicui/hyper-text"
import { NewsletterForm } from "./NewsletterForm"
import AnimatedLabels from "./AnimatedLabels"

const Hero = () => {
  return (
    <div className="bg-light-gray">
      <div className="container mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-3xl text-center mt-4 sm:mt-6 lg:mt-8">
          <div className="flex flex-col items-center mb-2 space-y-2 sm:space-y-3">
            <h1 className="font-space-mono-bold text-2xl sm:text-3xl lg:text-5xl tracking-tight text-blumine">
              <HyperText
                text="Digitální páteř"
                className="inline-block text-blumine"
              />
            </h1>
            <h1 className="font-space-mono-bold text-2xl sm:text-3xl lg:text-5xl tracking-tight text-blumine">
              pro české zdravotnictví
            </h1>
          </div>
          <p className="font-raleway-regular mb-2 mt-1 text-sm sm:text-base text-astral px-4 sm:px-0">
            Pracujeme na tom, abychom vám brzy mohli představit kompletní online
            prezentaci. Připojte se k nám na cestě k efektivnější a dostupnější
            zdravotní péči.
          </p>
        </div>
        <div className="w-full max-w-lg mb-4">
          <NewsletterForm />
        </div>
        <div className="w-full">
          <AnimatedLabels />
        </div>
      </div>
    </div>
  )
}
export default Hero
