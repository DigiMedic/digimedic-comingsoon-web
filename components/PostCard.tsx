import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostOrPage } from '@tryghost/content-api';

interface PostCardProps {
  post: PostOrPage;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {post.feature_image && (
        <div className="relative h-48">
          <Image
            src={post.feature_image}
            alt={post.title || ''}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          <Link href={`/blog/${post.slug}`} className="text-blumine hover:text-fountain-blue transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-astral">
            {new Date(post.published_at || '').toLocaleDateString('cs-CZ')}
          </span>
          <Link href={`/blog/${post.slug}`} className="text-fountain-blue hover:text-blumine transition-colors">
            Číst více
          </Link>
        </div>
      </div>
    </div>
  );
};