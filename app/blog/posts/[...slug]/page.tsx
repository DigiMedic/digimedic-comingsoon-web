import { getPostBySlug, getPosts, convertGhostPostToBlogPost } from 'lib/ghost';
import FullArticle from 'components/FullArticle';
import FormComponent from 'components/FormComponent';
import type { BlogPost } from 'types/blog';

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const ghostPost = await getPostBySlug(params.slug);
  
  if (!ghostPost) {
    return <div>Článek nebyl nalezen</div>;
  }

  const post = convertGhostPostToBlogPost(ghostPost);
  const allPosts = await getPosts();
  const relatedPosts = allPosts.map(convertGhostPostToBlogPost).filter((p: BlogPost) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <FullArticle post={post} relatedPosts={relatedPosts} />
      <FormComponent />
    </>
  );
}
