// components/BlogHero.tsx
import React from "react"
import { motion } from "framer-motion"

interface BlogHeroProps {
  title: string
  subtitle: string
}

export default function BlogHero({ title, subtitle }: BlogHeroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16 px-4 pt-16 text-center sm:pt-24 md:pt-32 sm:px-6 lg:px-8"
    >
      <h1 className="mb-6 text-3xl font-space-bold-regular transition-standard sm:text-4xl md:text-5xl lg:text-6xl">
        {title.split(" ").map((word, index) =>
          index === 1 ? (
            <span key={index} className="text-gradient">
              {word}{" "}
            </span>
          ) : (
            word + " "
          )
        )}
      </h1>
      <p className="max-w-2xl mx-auto text-lg font-raleway-regular text-astral transition-standard sm:text-xl">
        {subtitle}
      </p>
    </motion.header>
  )
}
