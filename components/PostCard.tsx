"use client";
import React from 'react';
import Image from "next/image";
import { Clock, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AnimatedCard } from './AnimatedCard';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags?: { name: string }[];  // Přidáno '?'
  feature_image?: string;
  reading_time?: number;
  published_at: string;
}

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-indigo-100 text-indigo-800',
];

const getTagColor = (tagName: string) => {
  const index = tagName.length % tagColors.length;
  return tagColors[index];
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('cs-CZ', options);
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <AnimatedCard
      link={`/blog/posts/${post.slug}`}
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden h-full",
        "transition-standard hover:shadow-lg border border-powder-blue"
      )}
    >
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-space-bold-regular text-blumine mb-3 line-clamp-2 transition-standard group-hover:text-fountain-blue">
          {post.title}
        </h3>
        <p className="text-sm font-raleway-regular text-astral mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-col mt-auto">
          <div className="flex items-center text-xs text-astral font-raleway-regular mb-3">
            <span className="flex items-center mr-3">
              <Calendar size={12} className="mr-1" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {post.reading_time} min čtení
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-auto">
            {post.tags?.slice(0, 2).map(tag => (
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
