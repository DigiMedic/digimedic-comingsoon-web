"use client";  // Přidejte tuto řádku na začátek souboru

import React, { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

const MenuItem = motion(Link)

interface MenuItemProps {
  href: string;
  item: string;
  setActive: (item: string) => void;
  active: string | null;
}

const MenuItemComponent = ({ setActive, active, item, href }: MenuItemProps) => (
  <MenuItem
    href={href}
    className={cn(
      "relative rounded-md px-3 py-1 text-sm font-medium text-blumine transition-all duration-500 hover:text-fountain-blue",
      active === item ? "text-fountain-blue" : ""
    )}
    onMouseEnter={() => setActive(item)}
    onFocus={() => setActive(item)}
  >
    <span>{item}</span>
    {active === item && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-fountain-blue to-blumine"
        layoutId="activeMenuItem"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </MenuItem>
)

export const DigiMedicNavigation = () => {
  const [active, setActive] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onMouseLeave={() => setActive(null)}
        className="inline-flex justify-center space-x-4 rounded-full border border-gray-200 bg-white/90 px-4 py-2 shadow-md backdrop-blur-md"
      >
        <MenuItemComponent setActive={setActive} active={active} item="Domů" href="/" />
        <MenuItemComponent setActive={setActive} active={active} item="Blog" href="/blog" />
      </motion.nav>
    </div>
  )
}
