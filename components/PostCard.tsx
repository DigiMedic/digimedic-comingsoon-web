"use client";
import React from 'react';
import Image from "next/image";
import { Clock, Tag, Calendar } from 'lucide-react';
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
  'bg-blue-200 text-blue-800',
  'bg-green-200 text-green-800',
  'bg-yellow-200 text-yellow-800',
  'bg-red-200 text-red-800',
  'bg-indigo-200 text-indigo-800',
  'bg-purple-200 text-purple-800',
  'bg-pink-200 text-pink-800',
];

const getTagColor = (tagName: string) => {
  const index = tagName.length % tagColors.length;
  return tagColors[index];
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('cs-CZ', options);
};

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  if (!post || !post.slug) {
    return null;
  }

  return (
    <AnimatedCard link={`/blog/posts/${post.slug}`} className="h-full border border-gray-300">
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
        <div className="relative h-40 flex-shrink-0">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blumine to-fountain-blue flex items-center justify-center p-4">
              <h3 className="text-white text-lg font-bold text-center line-clamp-2">{post.title}</h3>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className="bg-white text-blumine text-xs font-semibold px-2 py-1 rounded-full shadow">
              DigiMedic
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-base font-space-bold-regular text-blumine mb-2 line-clamp-2 group-hover:text-fountain-blue transition-colors duration-300">
            {post.title}
          </h2>
          <div className="flex flex-col mt-auto">
            <div className="flex items-center justify-between text-xs text-astral font-raleway-regular mb-2">
              <span className="flex items-center">
                <Calendar size={10} className="mr-1" />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center">
                <Clock size={10} className="mr-1" />
                {post.reading_time} min
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map(tag => (
                <span 
                  key={tag.name} 
                  className={`inline-flex items-center text-xs px-1.5 py-0.5 rounded-full ${getTagColor(tag.name)}`}
                >
                  <Tag size={10} className="mr-0.5" />
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PostCard;