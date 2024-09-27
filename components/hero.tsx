"use client";

import HyperText from "@/components/magicui/hyper-text";
import { NewsletterForm } from "./NewsletterForm";
import AnimatedLabels from "./AnimatedLabels";

const Hero = () => {
  return (
    <div className="bg-light-gray">
      <div className="container mx-auto flex max-w-7xl flex-col items-center px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="max-w-3xl text-center mt-6 sm:mt-8 lg:mt-10">
          {/* Kontejner pro oba nadpisy */}
          <div className="flex flex-col items-center mb-2">
            <h1 className="font-space-mono-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-blumine mb-1">
              <HyperText
                className="inline-block text-blumine"
                text="Digitální páteř"
              />
            </h1>
            <h1 className="font-space-mono-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-blumine">
              pro české zdravotnictví
            </h1>
          </div>
          <p className="font-raleway-regular mb-2 mt-1 text-sm sm:text-base text-astral">
          Pracujeme na tom, abychom
            vám brzy mohli představit kompletní online prezentaci. Připojte se k
            nám na cestě k efektivnější a dostupnější zdravotní péči.
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
  );
}

export default Hero;
