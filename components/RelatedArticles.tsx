'use client';

import React from 'react';
import Link from 'next/link';
import { GhostPost } from '@/types/blog';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface RelatedArticlesProps {
  posts: GhostPost[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blumine mb-8 font-raleway text-center">
          Související články
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/blog/posts/${post.slug}`} key={post.id}>
              <article className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                {post.feature_image && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={post.feature_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blumine mb-2 font-raleway">
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
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
