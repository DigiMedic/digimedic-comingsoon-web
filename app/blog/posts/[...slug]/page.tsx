import { getSinglePost, getPosts } from '@/lib/ghost';
import { notFound } from "next/navigation"
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const post = await getSinglePost(params.slug.join('/'));
  
  if (!post) {
    return {
      title: 'Příspěvek nenalezen',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    // ... další metadata
  };
}

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const post = await getSinglePost(params.slug.join('/'));
  
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold text-blumine mb-4">{post.title}</h1>
      {post.feature_image && (
        <Image
          src={post.feature_image}
          alt={post.title || 'Článek'}
          width={1200}
          height={630}
          className="rounded-lg mb-6"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
    </article>
  );
}

export const revalidate = 3600; // revalidace každou hodinu