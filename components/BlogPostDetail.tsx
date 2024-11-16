import React from 'react';
import { BlogPost } from '@/types/blog';
import Image from 'next/image';
import Container from './Container';

interface BlogPostDetailProps {
  post: BlogPost;
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

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

        {post.imageUrl && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] mb-8 sm:mb-12 rounded-lg sm:rounded-2xl overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none
            prose-headings:font-raleway prose-headings:text-blumine prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-8
            prose-h2:text-3xl prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mb-4
            prose-p:font-raleway prose-p:text-astral prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-fountain-blue prose-a:no-underline hover:prose-a:text-blumine hover:prose-a:transition-colors
            prose-strong:text-blumine prose-strong:font-bold
            prose-ul:text-astral prose-ol:text-astral
            prose-li:font-raleway
            prose-blockquote:text-astral prose-blockquote:border-l-4 prose-blockquote:border-blumine prose-blockquote:pl-6 prose-blockquote:italic
            prose-hr:border-powder-blue
            prose-img:rounded-xl prose-img:shadow-lg
            prose-code:font-space prose-code:text-blumine prose-code:bg-powder-blue/20 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-blumine prose-pre:text-powder-blue"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-16 pt-8 border-t border-powder-blue">
          <div className="flex justify-between items-center font-space text-astral">
            <div>
              Publikováno: {formatDate(post.publishedAt)}
            </div>
            <div>
              Doba čtení: {post.reading_time} min
            </div>
          </div>
        </footer>
      </article>
    </Container>
  );
}
