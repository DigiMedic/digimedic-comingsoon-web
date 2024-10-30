"use client";

import { cn } from 'lib/utils';
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const AnimatedCard = ({
  children,
  link,
  className,
}: {
  children: React.ReactNode;
  link: string;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={link}
      className="group relative block h-full w-full rounded-lg p-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="sync">
        {isHovered && (
          <motion.div
            key="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="absolute inset-0 block h-full w-full rounded-lg bg-neutral-200 p-4 dark:bg-slate-600/[0.5]"
              layoutId="hoverBackground"
              transition={{ duration: 0.15 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn(
          "relative z-20 h-full w-full overflow-hidden rounded-lg border border-transparent bg-white p-1 dark:border-white/[0.2] group-hover:border-slate-700",
          className
        )}
      >
        <div className="relative z-50">{children}</div>
      </div>
    </Link>
  );
};
