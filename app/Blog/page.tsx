"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { getPosts } from '@/lib/ghost';
import { PostCard } from '@/components/PostCard';
import { PostCardList } from '@/components/PostCardList';
import { FeaturedPost } from '@/components/FeaturedPost';
import BlogHero from '@/components/BlogHero';
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import SEO from '@/components/SEO';
import ErrorBoundary from '@/components/ErrorBoundary';
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags: { name: string }[];
  feature_image?: string;
  reading_time?: number;
  published_at: string;
}

export default function BlogHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const tags = useMemo(() =>
    Array.from(new Set(posts.flatMap(post => post.tags.map(tag => tag.name)))),
    [posts]
  );

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === '' || post.tags.some(tag => tag.name === selectedTag))
    );
    setFilteredPosts(results);
  }, [searchTerm, selectedTag, posts]);

  if (error) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <h2 className="text-2xl font-bold text-blumine mb-4">Chyba při načítání článků</h2>
        <p className="text-lg text-astral">{error.message}</p>
      </div>
    );
  }

  const featuredPost = posts[0];
  const topPosts = posts.slice(1, 3);
  const remainingPosts = filteredPosts.slice(3);

  const sectionTitle = selectedTag ? `Články kategorie: ${selectedTag}` : 'Všechny články';

  return (
    <ErrorBoundary>
      <SEO
        title="Blog"
        description="Zjistěte, jak digitalizace mění zdravotnictví"
      />
      <div className={cn(
        "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
        "animate-fade-in"
      )}>
        <BlogHero
          title="Blog"
          subtitle="Osobní blog"
        />

        {isLoading ? (
          <div className="text-center py-10 animate-pulse">
            <p className="text-lg text-astral">Načítání článků...</p>
          </div>
        ) : (
          <>
            {featuredPost && <FeaturedPost post={featuredPost} />}

            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blumine mb-8">Nové články</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {topPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </motion.div>

            <motion.div
              className={cn(
                "mb-12 flex flex-col md:flex-row items-center justify-between",
                "bg-polar p-6 rounded-lg shadow-md"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                    "font-raleway-regular transition-standard"
                  )}
                  aria-label="Vyhledávání článků"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-astral" size={20} />
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
                    "font-raleway-regular transition-standard"
                  )}
                  aria-label="Filtrovat podle tagu"
                >
                  <option value="">Všechny tagy</option>
                  {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blumine mb-8">{sectionTitle}</h2>
              <div className="space-y-8">
                {remainingPosts.map((post) => (
                  <PostCardList key={post.id} post={post} />
                ))}
              </div>
            </motion.div>
          </>
        )}

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-astral font-raleway-regular">
            © {new Date().getFullYear()} DigiMedic. Všechna práva vyhrazena.
          </p>
        </motion.footer>
      </div>
    </ErrorBoundary>
  );
}
