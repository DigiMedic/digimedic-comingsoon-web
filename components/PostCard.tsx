"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { GhostPost } from "@/types/blog"

interface PostCardProps {
  post: GhostPost
}

export function PostCard({ post }: PostCardProps) {
  // Funkce pro získání URL obrázku
  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    
    try {
      // Pokud URL začíná na http://, použijeme ji přímo
      if (url.startsWith('http://')) {
        return url;
      }
      
      // Pokud URL začíná na https://, převedeme ji na http://
      if (url.startsWith('https://')) {
        return url.replace('https://', 'http://');
      }
      
      // Jinak přidáme základní URL Ghost serveru
      return `http://194.164.72.131:2368${url}`;
    } catch (e) {
      console.error('Chyba při zpracování URL obrázku:', e);
      return null;
    }
  }

  const imageUrl = getImageUrl(post.feature_image);
  const formattedDate = new Date(post.published_at || Date.now()).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      <div className="aspect-w-16 aspect-h-9 relative bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            unoptimized={true}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">Obrázek není k dispozici</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <h3 className="font-raleway text-xl font-semibold text-blumine group-hover:text-astral">
            {post.title}
          </h3>
          <p className="mt-3 text-base text-astral/80 line-clamp-3">
            {post.excerpt || post.custom_excerpt}
          </p>
        </div>
        <div className="mt-4">
          <div className="text-sm text-astral/60">
            <time dateTime={post.published_at || new Date().toISOString()}>
              {formattedDate}
            </time>
            <span className="mx-1">•</span>
            <span>{post.reading_time || 5} min čtení</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
