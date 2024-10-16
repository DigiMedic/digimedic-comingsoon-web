// components/BlogHero.tsx
import React from 'react';
import { motion } from "framer-motion";

interface BlogHeroProps {
  title: string;
  subtitle: string;
}

export default function BlogHero({ title, subtitle }: BlogHeroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 sm:pt-24 md:pt-32 text-center mb-16 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-3xl font-space-bold-regular sm:text-4xl md:text-5xl lg:text-6xl mb-6 transition-standard">
        {title.split(' ').map((word, index) =>
          index === 1 ? (
            <span key={index} className="text-gradient">
              {word}{' '}
            </span>
          ) : (
            word + ' '
          )
        )}
      </h1>
      <p className="text-lg sm:text-xl text-astral font-raleway-regular max-w-2xl mx-auto transition-standard">
        {subtitle}
      </p>
    </motion.header>
  );
}
