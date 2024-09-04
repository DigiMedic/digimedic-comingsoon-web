// components/RelatedArticles.tsx
import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface RelatedArticlesProps {
  posts?: BlogPost[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ posts = [] }) => {
  if (posts.length === 0) {
    return null; // Pokud nejsou žádné související články, komponenta se nezobrazí
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold mb-6">Související články</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <article className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              {post.feature_image && (
                <img src={post.feature_image} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;