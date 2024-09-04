"use client";

import HyperText from "@/components/magicui/hyper-text";
import { NewsletterForm } from "./NewsletterForm";
import AnimatedLabels from "./AnimatedLabels";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <div className="container mx-auto flex max-w-7xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-4">
          <Image src="/brand/svg/favicon.svg" alt="Logo" width={60} height={60} />
        </div>
        <div className="max-w-3xl text-center">
          {/* První řádek */}
          <h1 className="font-space-mono-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-blumine">
            <HyperText
              className="inline-block text-blumine"
              text="Digitální páteř"
            />
          </h1>
          {/* Druhý řádek */}
          <h1 className="font-space-mono-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-blumine mt-1">
            pro české zdravotnictví
          </h1>
          <p className="font-raleway-regular mb-2 mt-1 text-sm text-astral sm:text-base">
            Naše webové stránky jsou právě ve vývoji. Pracujeme na tom, abychom
            vám brzy mohli představit kompletní online prezentaci. Připojte se k
            nám na cestě k efektivnější a dostupnější zdravotní péči.
          </p>
        </div>
        <div className="mt-3 w-full max-w-lg sm:mt-4">
          <NewsletterForm />
        </div>
        <div className="mt-6 w-full">
          <AnimatedLabels />
        </div>
      </div>
    </div>
  );
}

export default Hero;
