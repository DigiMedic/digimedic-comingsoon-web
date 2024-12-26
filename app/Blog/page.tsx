import React from "react"
import { getPosts } from "@/lib/ghost"
import Container from "@/components/Container"
import SEO from "@/components/SEO"
import ErrorBoundary from "@/components/ErrorBoundary"
import { ClientBlogContent } from "@/components/ClientBlogContent"

async function getInitialPosts() {
  try {
    console.log("Fetching posts on server...")
    console.log("Ghost URL:", process.env.NEXT_PUBLIC_GHOST_URL)
    console.log("Ghost Key exists:", !!process.env.NEXT_PUBLIC_GHOST_KEY)
    
    const posts = await getPosts()
    
    if (!posts || posts.length === 0) {
      console.warn("No posts were fetched from Ghost API")
      return []
    }
    
    console.log(`Successfully fetched ${posts.length} posts on server`)
    return posts
  } catch (error) {
    console.error("Error fetching posts on server:", error)
    throw error
  }
}

export const revalidate = 60 // revalidace stránky každou minutu

export default async function BlogPage() {
  const initialPosts = await getInitialPosts()

  if (!initialPosts || initialPosts.length === 0) {
    return (
      <Container>
        <SEO
          title="Blog | DigiMedic"
          description="Nejnovější články a novinky ze světa digitálního zdravotnictví"
        />
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Nepodařilo se načíst články
          </h2>
          <p className="text-gray-600">
            Zkuste to prosím později nebo kontaktujte podporu.
          </p>
        </div>
      </Container>
    )
  }

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
