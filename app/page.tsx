import { Metadata } from "next"
import Hero from "@/components/hero"
import FUIFeatureSectionWithCards from "@/components/fui-feature-section-with-cards"
import DockLive from "@/components/dock-live"
import TextRevealByWord from "@/components/TextRevealByWord";

export const metadata: Metadata = {
  title: "DigiMedic - Digitální páteř českého zdravotnictví",
  description: "Naše webové stránky jsou právě ve vývoji. Pracujeme na tom, abychom vám brzy mohli představit kompletní online prezentaci",
}

export default function IndexPage() {
  return (
    <>
      <Hero />
      <TextRevealByWord />
      <DockLive />
      <FUIFeatureSectionWithCards />
    </>
  )
}