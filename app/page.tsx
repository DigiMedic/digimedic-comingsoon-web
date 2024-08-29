import { Metadata } from "next"
import Hero from "@/components/hero"
import AnimatedLabels from "@/components/AnimatedLabels"  // Importujeme novou komponentu
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
      {/* Přidaný Umami Analytics skript */}
      <script defer src="https://cloud.umami.is/script.js" data-website-id="b28c9a28-7158-474b-aa3f-b51ccbbc6dde"></script>

      <Hero />
      <AnimatedLabels />  {/* Přidáváme komponentu s labely pod Hero */}
      <TextRevealByWord />
      <DockLive />
      <FUIFeatureSectionWithCards />
    </>
  )
}