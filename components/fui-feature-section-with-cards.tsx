"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Laptop, Brain, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactButton } from "components/ContactButton"

interface FAQ {
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
}

const faqsList: FAQ[] = [
  {
    title: "Naše vize",
    description:
      "Naší vizí je zdravotnictví, kde každý pacient má přístup k personalizované a preventivní péči, kde data pomáhají včas předcházet nemocem a kde špičková zdravotní péče je dostupná všem bez ohledu na to, kde žijí.",
    Icon: Brain,
  },
  {
    title: "Naše poslání",
    description:
      "Naším posláním je vytvářet inovativní digitální řešení, která zefektivňují procesy ve zdravotnictví, snižují administrativní zátěž a umožňují zdravotníkům věnovat více času péči o pacienty.",
    Icon: Shield,
  },
  {
    title: "Efektivní digitalizace",
    description:
      "Snižujeme administrativní zátěž a optimalizujeme procesy ve zdravotnictví. Naše řešení pomáhají zdravotnickým zařízením soustředit se na to nejdůležitější - péči o pacienty.",
    Icon: Laptop,
  },
  {
    title: "Bezpečnost dat",
    description:
      "Garantujeme nejvyšší standardy ochrany citlivých zdravotnických informací. Využíváme nejmodernější technologie a postupy pro zabezpečení vašich dat.",
    Icon: Shield,
  },
  {
    title: "Inovativní řešení",
    description:
      "Přinášíme nejmodernější technologie pro zlepšení kvality zdravotní péče. Naše inovace pomáhají vytvářet efektivnější a dostupnější zdravotnictví pro všechny.",
    Icon: Brain,
  },
]

export default function MissionVisionFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative bg-transparent py-14">
      <div className="responsive-container md:flex gap-12">
        <div className="flex-1">
          <div className="max-w-lg mb-10">
            <h3 className="text-lg sm:text-xl md:text-2xl text-blumine font-space-bold-regular">
              Připraveni na digitální transformaci?
            </h3>
            <p className="mt-3 text-astral font-raleway-regular responsive-text">
              Zjistěte, jak DigiMedic může pomoci vaší organizaci zefektivnit
              procesy, zlepšit péči o pacienty a připravit se na budoucnost
              zdravotnictví. Nabízíme osobní konzultace šité na míru vašim
              potřebám.
            </p>
            <div className="h-[2px] mt-5 bg-fountain-blue w-16"></div>
            <ContactButton className="mt-6" href="#" />
          </div>
        </div>

        <div className="flex-1">
          <ul className="space-y-4">
            {faqsList.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <li
                  key={idx}
                  className={cn(
                    "rounded-md border border-fountain-blue/20 shadow-lg transition",
                    "bg-white hover:bg-powder-blue/10",
                    isOpen && "shadow-fountain-blue/30"
                  )}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="flex items-center justify-between w-full p-4 sm:p-6 focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <item.Icon
                        className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 text-fountain-blue transition-transform",
                          isOpen && "scale-110"
                        )}
                      />

                      <span className="text-lg sm:text-xl font-space-bold-regular text-blumine">
                        {item.title}
                      </span>
                    </div>
                    <motion.span
                      className="text-fountain-blue"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 sm:px-6 pb-4 sm:pb-6"
                      >
                        <p className="text-responsive text-astral font-raleway-regular">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
