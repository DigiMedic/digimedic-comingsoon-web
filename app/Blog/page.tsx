import React from 'react';
import { getPosts, convertGhostPostToBlogPost } from 'lib/ghost';
import BlogContent from '../../components/BlogContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | DigiMedic',
  description: 'Nejnovější články a novinky ze světa digitálního zdravotnictví',
};

export const revalidate = 3600;

export default async function BlogPage() {
  try {
    const posts = await getPosts();
    const convertedPosts = posts.map(convertGhostPostToBlogPost);

    return <BlogContent initialPosts={convertedPosts} />;
  } catch (error) {
    console.error('Chyba při načítání příspěvků:', error);
    return (
      <div className="py-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-blumine">
          Chyba při načítání článků
        </h2>
        <p className="text-lg text-astral">
          Omlouváme se, ale došlo k chybě při načítání článků.
        </p>
      </div>
    );
  }
}
