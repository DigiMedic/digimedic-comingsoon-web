import { getPostBySlug, getPosts } from "@/lib/ghost"
import { FullArticle } from "@/components/FullArticle"
import FormComponent from "@/components/FormComponent"
import type { BlogPost } from "@/types/blog"

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  const allPosts = await getPosts()
  const relatedPosts = allPosts.filter((p: BlogPost) => p.id !== post?.id).slice(0, 3)

  if (!post) {
    return <div>Článek nebyl nalezen</div>
  }

  return (
    <>
      <FullArticle post={post} relatedPosts={relatedPosts} />
      <FormComponent />
    </>
  )
}