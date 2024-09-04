"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  feature_image?: string;
  tags: { name: string }[];
  reading_time?: number;
}

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Link href={`/blog/posts/${post.slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {post.feature_image && (
          <div className="relative h-48">
            <Image
              src={post.feature_image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">DigiMedic</span>
            <span className="text-sm text-gray-500">{post.reading_time} min read</span>
          </div>
          <h2 className="text-xl font-bold text-blumine mb-2 line-clamp-2">{post.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag.name} className="bg-fountain-blue bg-opacity-10 text-fountain-blue text-xs px-2 py-1 rounded-full">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};