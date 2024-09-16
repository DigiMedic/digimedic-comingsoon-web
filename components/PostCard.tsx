"use client";
import React from 'react';
import Image from "next/image";
import { Clock, Tag } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AnimatedCard } from './AnimatedCard';

interface Post {
  title: string;
  slug: string;
  feature_image?: string;
  tags: { name: string }[];
  reading_time?: number;
  published_at: string;
}

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-indigo-100 text-indigo-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
];

const getTagColor = (tagName: string) => {
  const index = tagName.length % tagColors.length;
  return tagColors[index];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  if (!post || !post.slug) {
    return null;
  }

  return (
    <AnimatedCard link={`/blog/posts/${post.slug}`} className="w-full h-full">
      <div className={cn(
        "overflow-hidden rounded-lg shadow-md group bg-white",
        "flex flex-col h-full transition-standard hover:shadow-lg"
      )}>
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={post.feature_image || '/default-image.jpg'}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-standard group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-space-bold-regular mb-2 line-clamp-2 text-blumine transition-standard group-hover:text-fountain-blue">
            {post.title}
          </h2>
          <div className="flex items-center justify-between text-xs font-raleway-regular text-astral mb-2">
            <span>{formatDate(post.published_at)}</span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {post.reading_time} min
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-auto">
            {post.tags.slice(0, 2).map(tag => (
              <span
                key={tag.name}
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-raleway-regular transition-standard",
                  getTagColor(tag.name)
                )}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PostCard;