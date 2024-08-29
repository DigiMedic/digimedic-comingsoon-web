import { notFound } from "next/navigation"
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Metadata } from 'next';
import { JsonLd } from 'react-schemaorg';
import Image from 'next/image';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import MDXContent from '@/components/MDXContent';
import { serialize } from 'next-mdx-remote/serialize'

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post: BlogPost) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug.join('/'));
  
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
    const post = await getBlogPost(slug);
    console.log('Fetched post:', post);

    if (!post) {
      console.log('Post not found, returning 404');
      notFound();
    }

    const mdxSource = await serialize(post.content)

    return (
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            className="rounded-lg mb-6"
          />
        )}
        {post.excerpt && <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{post.excerpt}</p>}
        <div className="flex items-center space-x-2 text-sm mb-4">
          <time dateTime={post.date}>{format(new Date(post.date), 'd. MMMM yyyy', { locale: cs })}</time>
          <span>·</span>
          <span>{post.readingTime} min čtení</span>
        </div>
        {post.author && (
          <div className="flex items-center space-x-2 mb-6">
            {post.author.image && (
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span>{post.author.name}</span>
          </div>
        )}
        <MDXContent source={mdxSource} />
        <JsonLd
          item={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.date,
            "author": post.author ? {
              "@type": "Person",
              "name": post.author.name
            } : undefined
          }}
        />
      </article>
    );
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    notFound();
  }
}
