"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { getPosts } from 'lib/ghost';
import type { GhostPost } from 'lib/ghost';
import PostCard from 'components/PostCard';
import { PostCardList } from 'components/PostCardList';
import FeaturedPost from 'components/FeaturedPost';
import BlogHero from 'components/BlogHero';
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import SEO from 'components/SEO';
import ErrorBoundary from 'components/ErrorBoundary';
import { cn } from 'lib/utils';

export default function BlogHome() {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<GhostPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        console.log('Starting to fetch posts...');

        const fetchedPosts = await getPosts();
        console.log('Fetched posts:', fetchedPosts);

        if (!Array.isArray(fetchedPosts)) {
          console.error('Invalid posts data:', fetchedPosts);
          throw new Error('Neplatná data z API - posts nejsou pole');
        }

        if (fetchedPosts.length === 0) {
          console.log('No posts returned from API');
        }

        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        const message = err instanceof Error ? err.message : 'Nastala neočekávaná chyba';
        setErrorMessage(message);
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setIsLoading(false);
      }
    }

    console.log('Component mounted, calling fetchPosts...');
    fetchPosts();
  }, []);

  const tags = useMemo(() =>
    Array.from(new Set(posts.flatMap(post =>
      (post.tags?.map((tag: { name: string }) => tag.name) ?? []))
    )),
    [posts]
  );

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ((selectedTag === '' || post.tags?.some((tag: { name: string }) => tag.name === selectedTag)) ?? false)
    );
    setFilteredPosts(results);
  }, [searchTerm, selectedTag, posts]);

  if (isLoading) {
    return (
      <div className="animate-pulse py-10 text-center">
        <p className="text-lg text-astral">Načítání článků...</p>
        <p className="mt-2 text-sm text-gray-500">Připojuji se ke Ghost API</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="py-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-blumine">Chyba při načítání článků</h2>
        <p className="text-lg text-astral">{errorMessage}</p>
        <p className="mt-2 text-sm text-gray-500">
          Zkontrolujte konzoli prohlížeče pro více detailů
        </p>
      </div>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <div className="animate-fade-in py-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-blumine">Žádné příspěvky k zobrazení</h2>
        <p className="text-lg text-astral">
          {errorMessage || "Momentálně nejsou k dispozici žádné příspěvky."}
        </p>
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
        "animate-fade-in mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
      )}>
        <BlogHero
          title="Blog"
          subtitle="Osobní blog"
        />

        {isLoading ? (
          <div className="animate-pulse py-10 text-center">
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
              <h2 className="mb-8 text-2xl font-bold text-blumine">Nové články</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {topPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </motion.div>

            <motion.div
              className={cn(
                "mb-12 flex flex-col items-center justify-between md:flex-row",
                "rounded-lg bg-polar p-6 shadow-md"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative mb-4 w-full md:mb-0 md:w-auto">
                <input
                  type="text"
                  placeholder="Hledat články..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full md:w-64 py-2 pl-10 pr-4",
                    "rounded-full border border-powder-blue",
                    "font-raleway-regular transition-standard",
                    "focus:outline-none focus:ring-2 focus:ring-fountain-blue"
                  )}
                  aria-label="Vyhledávání článků"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-astral"
                  size={20}
                />
              </div>
              <div className="flex w-full items-center space-x-2 md:w-auto">
                <Tag className="text-blumine" size={20} />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className={cn(
                    "w-full md:w-auto",
                    "rounded-full border border-powder-blue px-4 py-2",
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
              <h2 className="mb-8 text-2xl font-bold text-blumine">{sectionTitle}</h2>
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
          <p className="font-raleway-regular text-astral">
            © {new Date().getFullYear()} DigiMedic. Všechna práva vyhrazena.
          </p>
        </motion.footer>
      </div>
    </ErrorBoundary>
  );
}
