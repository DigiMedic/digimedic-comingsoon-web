import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

const MenuItem = motion(Link)

// Upravte definici MenuItemProps, aby setActive a active byly volitelné
interface MenuItemProps {
  href: string;
  item: string;
  setActive?: (item: string) => void;
  active?: string | null; // Změna zde
}

const MenuItemComponent = ({ setActive, active, item, href }: MenuItemProps) => (
  <MenuItem
    href={href}
    className={cn(
      "relative rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-500 hover:text-gray-900",
      active === item ? "text-gray-900" : ""
    )}
    onMouseEnter={() => setActive && setActive(item)}
    onFocus={() => setActive && setActive(item)}
  >
    <span>{item}</span>
    {active === item && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
        layoutId="activeMenuItem"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </MenuItem>
)

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<string | null>(null)

  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex w-full justify-center space-x-4 rounded-full border border-gray-200 bg-white px-8 py-6 shadow-md"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<MenuItemProps>(child)) {
          return React.cloneElement(child, {
            setActive,
            active,
          })
        }
        return child
      })}
    </nav>
  )
}

export const DigiMedicNavigation = () => {
  return (
    <Menu>
      <MenuItemComponent href="/" item="Domů" />
      <MenuItemComponent href="/blog" item="Blog" />
    </Menu>
  )
}

export { MenuItemComponent as MenuItem }
