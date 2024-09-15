// components/BlogHero.tsx
import React from 'react';
import { motion } from "framer-motion";

interface BlogHeroProps {
  title: string;
  subtitle: string;
}

export const BlogHero: React.FC<BlogHeroProps> = ({ title, subtitle }) => (
  <motion.header 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-16"
  >
    <h1 className="text-4xl font-space-bold-regular sm:text-5xl md:text-6xl mb-4">
      {title.split(' ').map((word, index) => 
        index === 1 ? (
          <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-blumine to-fountain-blue">
            {word}{' '}
          </span>
        ) : (
          word + ' '
        )
      )}
    </h1>
    <p className="text-xl text-astral font-raleway-regular max-w-2xl mx-auto">
      {subtitle}
    </p>
  </motion.header>
);

export default BlogHero;