import { GhostPost } from '@/types/ghost';
import { getSinglePost, getPosts } from '@/lib/ghost';
import { notFound } from "next/navigation"
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Metadata } from 'next';
import { JsonLd } from 'react-schemaorg';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: GhostPost) => ({
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
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string[] } }) {
  console.log('Params received:', params);
  const slug = params.slug.join('/');
  console.log('Constructed slug:', slug);
  
  try {
    const post = await getSinglePost(slug);
    console.log('Fetched post:', post);

    if (!post) {
      console.log('Post not found, returning 404');
      notFound();
    }

    return (
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.feature_image && (
          <Image
            src={post.feature_image}
            alt={post.title}
            width={1200}
            height={630}
            className="rounded-lg mb-6"
          />
        )}
        {post.excerpt && <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{post.excerpt}</p>}
        <div className="flex items-center space-x-2 text-sm mb-4">
          <time dateTime={post.published_at}>{format(new Date(post.published_at), 'd. MMMM yyyy', { locale: cs })}</time>
          <span>·</span>
          <span>{post.reading_time} min čtení</span>
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <Image
            src={post.primary_author.profile_image || '/default-avatar.png'}
            alt={post.primary_author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>{post.primary_author.name}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        <JsonLd
          item={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.published_at,
            "author": {
              "@type": "Person",
              "name": post.primary_author.name
            }
          }}
        />
      </article>
    );
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    notFound();
  }
}
