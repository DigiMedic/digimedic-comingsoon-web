import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export default async function ManagePostsPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Spravovat články</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-2">
            <Link href={`/admin/edit/${post.slug}`} className="text-blue-500 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/admin" className="mt-4 inline-block text-blue-500 hover:underline">
        Zpět na admin
      </Link>
    </div>
  );
}