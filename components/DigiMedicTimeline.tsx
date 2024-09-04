"use client"

import React, { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Timeline } from "@/components/ui/timeline"

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineCardProps {
  entry: TimelineEntry
  idx: number
  isOpen: boolean
  toggleContent: (idx: number) => void
}

const TimelineCard: React.FC<TimelineCardProps> = React.memo(
  ({ entry, idx, isOpen, toggleContent }) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const handleToggle = useCallback(() => {
      toggleContent(idx)
    }, [idx, toggleContent])

    return (
      <div
        className={cn(
          "border-fountain-blue/30 hover:bg-polar/50 group relative overflow-hidden rounded-lg border bg-transparent transition-all",
          "duration-300 ease-in-out hover:shadow-lg",
          isOpen && "bg-polar/50"
        )}
      >
        <button
          className="w-full p-6 text-left"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={`timeline-content-${idx}`}
        >
          <h4 className="flex items-center justify-between font-space text-lg font-medium text-blumine">
            {entry.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "ml-2 h-5 w-5 text-fountain-blue transition-transform duration-300",
                isOpen ? "rotate-180 transform" : ""
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </h4>
        </button>
        <div
          ref={contentRef}
          id={`timeline-content-${idx}`}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-6 pb-6 font-raleway text-astral">{entry.content}</div>
        </div>
      </div>
    )
  }
)

TimelineCard.displayName = "TimelineCard"

export function DigiMedicTimeline() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  const toggleContent = useCallback((idx: number) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(idx)) {
        newSet.delete(idx)
      } else {
        newSet.add(idx)
      }
      return newSet
    })
  }, [])

  const timelineData: TimelineEntry[] = [
    {
      title: "2024 - Budoucnost",
      content: (
        <div>
          <p className="mb-4">Vize DigiMedic pro budoucnost českého zdravotnictví</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <Image
                src="/images/ai-diagnostics.jpg"
                alt="AI v diagnostice"
                width={500}
                height={300}
                className="rounded-lg object-cover h-40 w-full shadow-lg"
              />
              <p className="text-blumine text-sm mt-2">AI v diagnostice</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/telemedicine.jpg"
                alt="Rozšířená telemedicína"
                width={500}
                height={300}
                className="rounded-lg object-cover h-40 w-full shadow-lg"
              />
              <p className="text-blumine text-sm mt-2">Rozšířená telemedicína</p>
            </div>
          </div>
          <ul className="list-disc list-inside">
            <li>Implementace AI pro přesnější a rychlejší diagnostiku</li>
            <li>Rozšíření telemedicíny do odlehlých oblastí</li>
            <li>Vytvoření komplexní platformy pro personalizovanou prevenci</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2023 - Současnost",
      content: (
        <div>
          <p className="mb-4">Klíčové projekty a iniciativy DigiMedic</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <Image
                src="/images/doktor-na-dohled.jpg"
                alt="DoktorNaDohled"
                width={500}
                height={300}
                className="rounded-lg object-cover h-40 w-full shadow-lg"
              />
              <p className="text-blumine text-sm mt-2">DoktorNaDohled</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/health-data-platform.jpg"
                alt="Platforma pro zdravotní data"
                width={500}
                height={300}
                className="rounded-lg object-cover h-40 w-full shadow-lg"
              />
              <p className="text-blumine text-sm mt-2">Platforma pro zdravotní data</p>
            </div>
          </div>
          <ul className="list-disc list-inside">
            <li>Spuštění projektu DoktorNaDohled pro lepší dostupnost péče</li>
            <li>Vývoj platformy pro bezpečné sdílení zdravotních dat</li>
            <li>Partnerství s klíčovými zdravotnickými zařízeními</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2022 - Založení",
      content: (
        <div>
          <p className="mb-4">Vznik DigiMedic a stanovení našich základních cílů</p>
          <div className="mb-4">
            <Image
              src="/images/digimedic-founding.jpg"
              alt="Založení DigiMedic"
              width={500}
              height={300}
              className="rounded-lg object-cover w-full h-40 shadow-lg"
            />
          </div>
          <ul className="list-disc list-inside">
            <li>Definování vize digitální transformace českého zdravotnictví</li>
            <li>Sestavení týmu expertů z oblasti medicíny a IT</li>
            <li>Zahájení výzkumu a vývoje prvních digitálních řešení</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section className="mx-auto mt-12 max-w-screen-xl bg-transparent px-4 py-16 leading-relaxed md:px-8">
      <div className="mb-10 space-y-3 text-center">
        <h2 className="animate-fadeIn font-space text-3xl font-bold text-blumine">
          Cesta DigiMedic k digitalizaci zdravotnictví
        </h2>
        <p className="animate-fadeIn mx-auto max-w-lg font-raleway text-lg text-astral">
          Sledujte naši cestu od založení až po vizi budoucnosti, jak DigiMedic transformuje české zdravotnictví pomocí inovativních digitálních řešení.
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <Timeline data={timelineData.map((entry, idx) => ({
          ...entry,
          content: (
            <TimelineCard
              key={idx}
              idx={idx}
              entry={entry}
              isOpen={openIndices.has(idx)}
              toggleContent={toggleContent}
            />
          )
        }))} />
      </div>
    </section>
  )
}