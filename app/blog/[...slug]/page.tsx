import { getSinglePost } from '../../../lib/ghost';
import { notFound } from "next/navigation"
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Metadata } from 'next';
import { JsonLd } from 'react-schemaorg';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getSinglePost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string[] } }) {
  const post = await getSinglePost(params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 prose dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.excerpt && <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{post.excerpt}</p>}
      <div className="flex items-center space-x-2 text-sm mb-4">
        <time dateTime={post.published_at}>{format(new Date(post.published_at), 'd. MMMM yyyy', { locale: cs })}</time>
        <span>·</span>
        <span>{post.reading_time} min čtení</span>
      </div>
      <div className="flex items-center space-x-2 mb-6">
        <img src={post.primary_author.profile_image} alt={post.primary_author.name} className="w-10 h-10 rounded-full"/>
        <span>{post.primary_author.name}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      <JsonLd<BlogPosting>
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
}
