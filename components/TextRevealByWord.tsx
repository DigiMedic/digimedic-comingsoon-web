"use client"

import { FC, ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface TextRevealByWordProps {
  className?: string
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({ className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const text = `Inovujeme české zdravotnictví nezávisle a s vizí. Jsme technologická vývojářská organizace zaměřená výhradně na zdravotnictví. Naším cílem je prosazovat principy EHDS a modernizovat zdravotnictví ve prospěch lékařů a pacientů. Nepřidáváme byrokracii, ale přizpůsobujeme technologie skutečným potřebám uživatelů. Nabízíme služby a partnerství pro ty, kteří chtějí být součástí pozitivní změny. Chceme společně vytvářet budoucnost, kde technologie slouží zdravotnictví, ne naopak. Přečtěte si naše články a objevte, jak konkrétně můžeme transformovat zdravotní péči. Připojte se k nám a buďte součástí pozitivních změn.`

  const words = text.split(" ")

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[200vh] bg-transparent", className)}
    >
      <div className="absolute top-0 -z-10 h-full w-full">
        <div className="absolute bottom-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="sticky top-0 mx-auto flex h-screen max-w-4xl flex-col justify-center px-4 py-20">
        <div className="p-5 md:p-8 lg:p-10">
          <p className="flex flex-wrap text-xl font-normal leading-relaxed md:text-2xl lg:text-3xl">
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </p>
          <div className="mt-8 flex justify-end">
            <Link href="/blog">
              <AnimatedGradientText>Navštívit náš blog</AnimatedGradientText>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const AnimatedGradientText: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white px-4 py-1.5 text-sm font-medium text-[#1B4D6A] shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-shadow duration-500 ease-out",
        className
      )}
    >
      <div className="animate-gradient-x absolute inset-[-1px] -z-10 rounded-[inherit] bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:200%_200%] opacity-70" />
      {children}
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: any
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 font-['Space_Mono'] lg:mx-1.5">
      <span className="absolute text-[#1B4D6A] opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }} className="text-[#1B4D6A]">
        {children}
      </motion.span>
    </span>
  )
}

export default TextRevealByWord
