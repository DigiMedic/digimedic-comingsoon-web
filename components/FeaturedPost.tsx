// components/FeaturedPost.tsx
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GhostPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"
import { Clock, Calendar, ArrowRight, Star } from "lucide-react"

interface FeaturedPostProps {
  post: GhostPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-12"
    >
      <Link
        href={`/blog/posts/${post.slug}`}
        className="group relative block bg-gradient-to-br from-blumine/5 to-fountain-blue/5 rounded-3xl overflow-hidden transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blumine/5 via-fountain-blue/5 to-polar opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative grid md:grid-cols-2 items-stretch">
          {post.feature_image && (
            <div className="relative h-[400px] md:h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent z-10" />
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fountain-blue text-white text-sm font-space font-medium shadow-lg">
                  <Star className="w-4 h-4" />
                  Hlavní článek
                </span>
              </div>
            </div>
          )}
          
          <div className="relative p-10 flex flex-col justify-center space-y-8 bg-white/50 backdrop-blur-sm">
            <div className="space-y-2">
              {post.tags && post.tags[0] && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-astral/10 text-astral text-sm font-space">
                  {post.tags[0].name}
                </span>
              )}
              
              <h2 className="text-4xl font-bold text-blumine font-raleway group-hover:text-fountain-blue transition-colors duration-300 leading-tight">
                {post.title}
              </h2>
            </div>

            <p className="text-lg text-astral/90 font-raleway leading-relaxed line-clamp-3">
              {post.excerpt || post.custom_excerpt}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-blumine/10">
              <div className="flex items-center space-x-6 text-sm text-astral/80 font-space">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.published_at} className="font-medium">
                    {formatDate(new Date(post.published_at))}
                  </time>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{post.reading_time} min čtení</span>
                </div>
              </div>
              
              <motion.div 
                className="flex items-center gap-2 text-fountain-blue font-medium"
                initial={{ opacity: 0.5, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>Číst článek</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
