import React from 'react';
import { GhostPost } from '@/types/blog';
import { PostCardList } from './PostCardList';

interface BlogContentProps {
  initialPosts: GhostPost[];
}

export default function BlogContent({ initialPosts }: BlogContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialPosts.map((post) => (
          <PostCardList key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
