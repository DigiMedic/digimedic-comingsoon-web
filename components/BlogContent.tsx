import React from 'react';
import { BlogPost } from '../types/blog';
import { PostCardList } from './PostCardList';

interface BlogContentProps {
  initialPosts: BlogPost[];
}

const BlogContent: React.FC<BlogContentProps> = ({ initialPosts }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-blumine">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialPosts.map((post) => (
          <PostCardList key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogContent;
