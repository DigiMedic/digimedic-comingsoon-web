import { Metadata } from "next"
import FUIFeatureSectionWithCards from 'components/fui-feature-section-with-cards'
import Hero from 'components/hero'
import TextRevealByWord from 'components/TextRevealByWord'

export const metadata: Metadata = {
  title: "DigiMedic - Digitální páteř českého zdravotnictví",
  description:
    "Naše webové stránky jsou právě ve vývoji. Pracujeme na tom, abychom vám brzy mohli představit kompletní online prezentaci",
}

export default function IndexPage() {
  return (
    <div className="relative min-h-screen size-full">
      <div className="relative z-10">
        <Hero />
        <div className="absolute inset-0 -z-10 size-full animate-subtle-move">
          <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_80%_300px,#C9EBFF,transparent)]"></div>
        </div>
        <TextRevealByWord />
        <FUIFeatureSectionWithCards />
      </div>

      <script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="b28c9a28-7158-474b-aa3f-b51ccbbc6dde"
      ></script>
    </div>
  )
}
