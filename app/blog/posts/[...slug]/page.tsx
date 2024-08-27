import { getSinglePost, getPosts } from '../../../lib/ghost';
import { notFound } from "next/navigation"
import { format } from 'date-fns';

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

async function PostPage({ params }) {
  const post = await getSinglePost(params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {post.excerpt && <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{post.excerpt}</p>}
      <div className="flex items-center space-x-2 text-sm">
        <time dateTime={post.published_at}>{format(new Date(post.published_at), 'MMMM d, yyyy')}</time>
        <span>·</span>
        <span>{post.reading_time} min read</span>
      </div>
      <div className="flex items-center space-x-2">
        <img src={post.primary_author.profile_image} alt={post.primary_author.name} className="w-10 h-10 rounded-full"/>
        <span>{post.primary_author.name}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </article>
  );
}

export default PostPage;