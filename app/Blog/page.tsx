import React from "react"
import { getPosts } from "@/lib/ghost"
import Container from "@/components/Container"
import SEO from "@/components/SEO"
import ErrorBoundary from "@/components/ErrorBoundary"
import { ClientBlogContent } from "@/components/ClientBlogContent"

async function getInitialPosts() {
  try {
    console.log("Fetching posts on server...")
    const posts = await getPosts()
    console.log(`Successfully fetched ${posts.length} posts on server`)
    return posts
  } catch (error) {
    console.error("Error fetching posts on server:", error)
    throw error
  }
}

export default async function BlogPage() {
  const initialPosts = await getInitialPosts()

  return (
    <ErrorBoundary>
      <Container>
        <SEO
          title="Blog | DigiMedic"
          description="Nejnovější články a novinky ze světa digitálního zdravotnictví"
        />
        
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <ClientBlogContent initialPosts={initialPosts} />
        </div>
      </Container>
    </ErrorBoundary>
  )
}
