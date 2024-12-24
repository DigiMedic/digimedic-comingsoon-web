"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GhostPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: GhostPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className="group block bg-polar rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
    >
      {post.feature_image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-blumine mb-2 font-raleway group-hover:text-fountain-blue transition-colors">
          {post.title}
        </h3>
        <p className="text-astral mb-4 line-clamp-2 font-raleway">
          {post.excerpt || post.custom_excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-astral font-space">
          <time dateTime={post.published_at}>
            {formatDate(new Date(post.published_at))}
          </time>
          <span>{post.reading_time} min čtení</span>
        </div>
      </div>
    </Link>
  )
}
