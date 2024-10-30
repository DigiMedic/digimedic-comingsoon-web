import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GhostPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface PostCardListProps {
  post: GhostPost;
}

export function PostCardList({ post }: PostCardListProps) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className="group flex gap-6 bg-polar rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all p-4"
    >
      {post.feature_image && (
        <div className="relative w-48 aspect-[4/3] flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-blumine mb-2 font-raleway group-hover:text-fountain-blue transition-colors">
          {post.title}
        </h3>
        <p className="text-astral mb-4 line-clamp-2 font-raleway">
          {post.excerpt || post.custom_excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-astral font-space">
          <time dateTime={post.published_at}>
            {formatDate(new Date(post.published_at))}
          </time>
          <span>•</span>
          <span>{post.reading_time} min čtení</span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>•</span>
              <span>{post.tags[0].name}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
