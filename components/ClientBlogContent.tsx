"use client"

import React from "react"
import { GhostPost } from "@/types/blog"
import { Search, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { PostCardList } from "@/components/PostCardList"
import { FeaturedPost } from "@/components/FeaturedPost"
import { Suspense } from "react"

export function ClientBlogContent({ initialPosts }: { initialPosts: GhostPost[] }) {
  const [posts] = React.useState<GhostPost[]>(initialPosts)
  const [filteredPosts, setFilteredPosts] = React.useState<GhostPost[]>(initialPosts)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState("")

  // Logování pro debug
  React.useEffect(() => {
    console.log("Initial posts received:", initialPosts?.length || 0)
    console.log("First post title:", initialPosts?.[0]?.title)
  }, [initialPosts])

  const tags = React.useMemo(
    () =>
      Array.from(
        new Set(
          posts.flatMap((post) => post.tags?.map((tag) => tag.name) || [])
        )
      ),
    [posts]
  )

  React.useEffect(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = !selectedTag || post.tags?.some((tag) => tag.name === selectedTag)
      return matchesSearch && matchesTag
    })
    setFilteredPosts(filtered)
  }, [searchTerm, selectedTag, posts])

  const featuredPost = filteredPosts[0]
  const remainingPosts = filteredPosts.slice(1)

  // Pokud nemáme žádné články, zobrazíme chybovou hlášku
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Nepodařilo se načíst články
        </h2>
        <p className="text-gray-600">
          Zkuste to prosím později nebo kontaktujte podporu.
        </p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Načítání...</div>}>
      <div className="space-y-8">
        {featuredPost && <FeaturedPost post={featuredPost} />}

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Hledat články..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
                className={cn(
                  "inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium",
                  tag === selectedTag
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                )}
              >
                <Tag className="mr-1.5 size-4" />
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {remainingPosts.map((post) => (
            <PostCardList key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-gray-900">
              Žádné články nebyly nalezeny
            </h3>
            <p className="mt-2 text-gray-600">
              Zkuste upravit vyhledávací kritéria
            </p>
          </div>
        )}
      </div>
    </Suspense>
  )
}
