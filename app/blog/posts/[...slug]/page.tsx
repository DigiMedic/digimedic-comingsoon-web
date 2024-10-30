import { getPostBySlug, getPosts } from "@/lib/ghost";
import { FullArticle } from "@/components/FullArticle";
import FormComponent from "@/components/FormComponent";
import type { GhostPost } from "@/types/blog";

interface BlogPostParams {
  params: { slug: string[] };
}

export default async function BlogPost({ params }: BlogPostParams) {
  try {
    const fullSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
    const post = await getPostBySlug(fullSlug);
    const allPosts = await getPosts();

    if (!post) {
      return (
        <div className="py-10 text-center">
          <h2 className="mb-4 text-2xl font-bold text-blumine">
            Článek nebyl nalezen
          </h2>
          <p className="text-lg text-astral">
            Požadovaný článek neexistuje nebo byl odstraněn.
          </p>
        </div>
      );
    }

    const relatedPosts: GhostPost[] = allPosts
      .filter((p) => p.id !== post.id)
      .slice(0, 3);

    return (
      <>
        <FullArticle post={post} relatedPosts={relatedPosts} />
        <FormComponent />
      </>
    );
  } catch (error) {
    console.error('Chyba při načítání článku:', error);
    return (
      <div className="py-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-blumine">
          Chyba při načítání článku
        </h2>
        <p className="text-lg text-astral">
          {error instanceof Error ? error.message : 'Došlo k neočekávané chybě při načítání článku.'}
        </p>
      </div>
    );
  }
}
