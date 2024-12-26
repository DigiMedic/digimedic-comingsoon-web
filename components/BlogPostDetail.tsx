import React from "react"
import { BlogPost } from "@/types/blog"
import Image from "next/image"
import Container from "./Container"

interface BlogPostDetailProps {
  post: BlogPost
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

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

  const imageUrl = getImageUrl(post.imageUrl);

  return (
    <Container className="py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-bold text-blumine mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-astral font-space text-base sm:text-lg flex flex-wrap justify-center gap-2 sm:gap-3">
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>{post.reading_time} min čtení</span>
          </div>
        </header>

        {imageUrl && (
          <div className="mb-8 sm:mb-12 relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1536px) 100vw, 1536px"
              priority
              unoptimized={true}
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:font-raleway prose-headings:text-blumine prose-p:text-astral/90 prose-a:text-fountain-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-blumine prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Container>
  )
}
