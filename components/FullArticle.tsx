'use client';

import React from 'react';
import Image from 'next/image';
import { GhostPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import Container from './Container';
import { PostCard } from './PostCard';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Script from 'next/script';

interface FullArticleProps {
  post: GhostPost;
  relatedPosts: GhostPost[];
}

export function FullArticle({ post, relatedPosts }: FullArticleProps) {
  const firstTag = post.tags?.[0]?.name ?? null;

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Domů', url: 'https://www.digimedic.cz' },
    { name: 'Blog', url: 'https://www.digimedic.cz/blog' },
    { name: post.title, url: `https://www.digimedic.cz/blog/posts/${post.slug}` },
  ]);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bg-polar">
        <Container>
          <article className="max-w-4xl mx-auto py-16">
            {/* Header */}
            <header className="mb-12 text-center">
              <h1 className="text-5xl font-raleway font-bold text-blumine mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="text-astral font-space text-lg flex items-center justify-center gap-3">
                <time dateTime={post.published_at}>
                  {formatDate(new Date(post.published_at))}
                </time>
                <span>•</span>
                <span>{post.reading_time} min čtení</span>
                {firstTag && (
                  <>
                    <span>•</span>
                    <span>{firstTag}</span>
                  </>
                )}
              </div>
            </header>

            {/* Hlavní obrázek */}
            {post.feature_image && (
              <div className="relative w-full aspect-[21/9] mb-12 rounded-2xl overflow-hidden">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Obsah článku */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.html || '' }}
            />
          </article>

          {/* Související články */}
          {relatedPosts.length > 0 && (
            <section className="py-16 border-t border-powder-blue">
              <h2 className="text-3xl font-bold text-blumine mb-8 font-raleway text-center">
                Související články
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    </>
  );
}
