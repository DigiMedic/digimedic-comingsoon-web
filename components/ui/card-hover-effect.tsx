import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: string;
    title: string;
    description: string;
    link: string;
    feature_image?: string;
    published_at?: string;
    reading_time?: number;
    tags?: { id: string; name: string }[];
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className={cn("grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          className="relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link href={item.link} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {item.feature_image ? (
                  <Image
                    src={item.feature_image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blumine to-fountain-blue flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">DigiMedic</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blumine mb-2 line-clamp-2 hover:text-fountain-blue transition-colors duration-200">
                  {item.title || 'Bez názvu'}
                </h3>
                {item.description && (
                  <p className="text-astral mb-4 line-clamp-3 text-sm">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center text-sm text-fountain-blue mt-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="mr-4">{item.published_at ? new Date(item.published_at).toLocaleDateString() : 'Bez data'}</span>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{item.reading_time || '2'} min čtení</span>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-fountain-blue text-white hover:bg-blumine transition-colors duration-200">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag.name}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
          <motion.div
            className="absolute inset-0 bg-blumine rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === idx ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("text-xl font-bold text-blumine mb-2 line-clamp-2 hover:text-fountain-blue transition-colors duration-200", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={cn("text-astral mb-4 line-clamp-3 text-sm", className)}>
      {children}
    </p>
  );
};