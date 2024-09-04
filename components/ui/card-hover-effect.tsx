import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, Tag } from "lucide-react"

import { cn } from "@/lib/utils"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: string
    title: string
    description: string
    link: string
    feature_image?: string
    published_at?: string
    reading_time?: number
    tags?: { id: string; name: string }[]
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <div
      className={cn(
        "grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          className="relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link href={item.link} className="block">
            <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {item.feature_image ? (
                  <Image
                    src={item.feature_image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform transition-transform duration-300 ease-in-out hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blumine to-fountain-blue">
                    <span className="text-2xl font-bold text-white">
                      DigiMedic
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="mb-2 line-clamp-2 text-xl font-bold text-blumine transition-colors duration-200 hover:text-fountain-blue">
                  {item.title || "Bez názvu"}
                </h3>
                {item.description && (
                  <p className="mb-4 line-clamp-3 text-sm text-astral">
                    {item.description}
                  </p>
                )}
                <div className="mt-4 flex items-center text-sm text-fountain-blue">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="mr-4">
                    {item.published_at
                      ? new Date(item.published_at).toLocaleDateString()
                      : "Bez data"}
                  </span>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{item.reading_time || "2"} min čtení</span>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center rounded-full bg-fountain-blue px-2 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-blumine"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag.name}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
          <motion.div
            className="absolute inset-0 rounded-lg bg-blumine"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === idx ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h3
      className={cn(
        "mb-2 line-clamp-2 text-xl font-bold text-blumine transition-colors duration-200 hover:text-fountain-blue",
        className
      )}
    >
      {children}
    </h3>
  )
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p className={cn("mb-4 line-clamp-3 text-sm text-astral", className)}>
      {children}
    </p>
  )
}
