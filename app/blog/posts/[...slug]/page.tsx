import { getPostBySlug } from "@/lib/ghost"
import { FullArticle } from "@/components/FullArticle"

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return <div>Článek nebyl nalezen</div>
  }

  return <FullArticle post={post} />
}
