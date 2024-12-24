// components/FeaturedPost.tsx
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GhostPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"

interface FeaturedPostProps {
  post: GhostPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className="group block bg-polar rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {post.feature_image && (
          <div className="relative aspect-[16/9] md:aspect-square overflow-hidden">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        )}
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-fountain-blue/10 text-fountain-blue text-sm font-space">
              Doporučený článek
            </span>
          </div>
          <h2 className="text-3xl font-bold text-blumine mb-4 font-raleway group-hover:text-fountain-blue transition-colors">
            {post.title}
          </h2>
          <p className="text-astral mb-6 line-clamp-3 font-raleway">
            {post.excerpt || post.custom_excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-astral font-space">
            <time dateTime={post.published_at}>
              {formatDate(new Date(post.published_at))}
            </time>
            <span>{post.reading_time} min čtení</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
