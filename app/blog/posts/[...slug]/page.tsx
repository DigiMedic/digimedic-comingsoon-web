import { getSinglePost, getPosts } from '@/lib/ghost';
import { notFound } from "next/navigation"
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
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
    return {};
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [{ url: post.feature_image }] : [],
    },
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
          alt={post.title}
          width={1200}
          height={630}
          className="rounded-lg mb-6"
        />
      )}
      {post.excerpt && <p className="text-xl mt-0 text-astral mb-6">{post.excerpt}</p>}
      <div className="flex items-center space-x-4 text-sm text-fountain-blue mb-8">
        <time dateTime={post.published_at}>
          {format(new Date(post.published_at), 'd. MMMM yyyy', { locale: cs })}
        </time>
        <span>·</span>
        <span>{post.reading_time} min čtení</span>
      </div>
      <div className="flex items-center space-x-4 mb-8">
        <Image
          src={post.primary_author.profile_image || '/default-avatar.png'}
          alt={post.primary_author.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-medium text-blumine">{post.primary_author.name}</span>
      </div>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}