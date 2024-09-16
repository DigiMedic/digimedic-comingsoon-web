import { cn } from "@/lib/utils";
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
      className="relative group block p-1 h-full w-full rounded-lg"
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
              className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-600/[0.5] block rounded-lg p-4"
              layoutId="hoverBackground"
              transition={{ duration: 0.15 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn(
          "rounded-lg h-full w-full p-1 overflow-hidden bg-white border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
          className
        )}
      >
        <div className="relative z-50">{children}</div>
      </div>
    </Link>
  );
};
