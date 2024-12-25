"use client"

import React, { useState, useEffect, useMemo } from "react"
import { getPosts } from "@/lib/ghost"
import { GhostPost } from "@/types/blog"
import { motion } from "framer-motion"
import { Search, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import Container from "@/components/Container"
import { PostCard } from "@/components/PostCard"
import { PostCardList } from "@/components/PostCardList"
import { FeaturedPost } from "@/components/FeaturedPost"
import SEO from "@/components/SEO"
import ErrorBoundary from "@/components/ErrorBoundary"

export default function BlogPage() {
  const [posts, setPosts] = useState<GhostPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<GhostPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        const fetchedPosts = await getPosts()
        setPosts(fetchedPosts)
        setFilteredPosts(fetchedPosts)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        )
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const tags = useMemo(
    () =>
      Array.from(
        new Set(
          posts.flatMap((post) => post.tags?.map((tag) => tag.name) || [])
        )
      ),
    [posts]
  )

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTag === "" ||
          post.tags?.some((tag) => tag.name === selectedTag))
    )
    setFilteredPosts(results)
  }, [searchTerm, selectedTag, posts])

  if (error) {
    return (
      <Container>
        <div className="text-center py-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-blumine mb-4">
            Chyba při načítání článků
          </h2>
          <p className="text-lg text-astral">{error.message}</p>
        </div>
      </Container>
    )
  }

  const featuredPost = posts[0]
  const topPosts = posts.slice(1, 3)
  const remainingPosts = filteredPosts.slice(3)

  return (
    <ErrorBoundary>
      <SEO
        title="Blog"
        description="Zjistěte, jak digitalizace mění zdravotnictví"
      />

      <Container className="py-12">
        <div className="max-w-5xl mx-auto animate-fade-in">
          {/* Hero sekce */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-blumine mb-4 font-raleway">
              Blog
            </h1>
            <p className="text-xl text-astral font-space">
              Zjistěte, jak digitalizace mění zdravotnictví
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-10 animate-pulse">
              <p className="text-lg text-astral">Načítání článků...</p>
            </div>
          ) : (
            <>
              {/* Zvýrazněný článek */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-16"
                >
                  <FeaturedPost post={featuredPost} />
                </motion.div>
              )}

              {/* Vyhledávání a filtry */}
              <motion.div
                className="mb-12 flex flex-col md:flex-row items-center justify-between bg-polar p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative mb-4 md:mb-0 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Hledat články..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                      "w-full md:w-64 pl-10 pr-4 py-2",
                      "border border-powder-blue rounded-full",
                      "focus:outline-none focus:ring-2 focus:ring-fountain-blue",
                      "font-raleway transition-all"
                    )}
                  />

                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-astral"
                    size={20}
                  />
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <Tag className="text-blumine" size={20} />
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className={cn(
                      "w-full md:w-auto",
                      "border border-powder-blue rounded-full px-4 py-2",
                      "focus:outline-none focus:ring-2 focus:ring-fountain-blue",
                      "font-raleway transition-all"
                    )}
                  >
                    <option value="">Všechny tagy</option>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Top články */}
              {topPosts.length > 0 && (
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-blumine mb-8 font-raleway">
                    Nové články
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {topPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Ostatní články */}
              {remainingPosts.length > 0 && (
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-blumine mb-8 font-raleway">
                    {selectedTag
                      ? `Články kategorie: ${selectedTag}`
                      : "Všechny články"}
                  </h2>
                  <div className="space-y-8">
                    {remainingPosts.map((post) => (
                      <PostCardList key={post.id} post={post} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Footer */}
              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-16 text-center"
              >
                <p className="text-astral font-raleway">
                  {new Date().getFullYear()} DigiMedic. Všechna práva
                  vyhrazena.
                </p>
              </motion.footer>
            </>
          )}
        </div>
      </Container>
    </ErrorBoundary>
  )
}
