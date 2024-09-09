"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { getPosts } from '@/lib/ghost';
import { PostCard } from '@/components/PostCard';
import { PostCardList } from '@/components/PostCardList';
import { FeaturedPost } from '@/components/FeaturedPost'; // Importujeme vaši existující komponentu
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import SEO from '@/components/SEO';
import ErrorBoundary from '@/components/ErrorBoundary';

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
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-blumine mb-4">Chyba při načítání článků</h2>
        <p className="text-lg text-gray-600">{error.message}</p>
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
        title="DigiMedic Blog"
        description="Objevte nejnovější trendy a inovace v digitalizaci zdravotnictví"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-space-bold-regular sm:text-5xl md:text-6xl mb-4">
            Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-blumine to-fountain-blue">DigiMedic</span>
          </h1>
          <p className="text-xl text-astral font-raleway-regular max-w-2xl mx-auto">
            Objevte nejnovější trendy a inovace v digitalizaci zdravotnictví
          </p>
        </motion.header>

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Načítání článků...</p>
          </div>
        ) : (
          <>
            {featuredPost && <FeaturedPost post={featuredPost} />}

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-blumine mb-8">Nové články</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {topPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            <div className="mb-12 flex flex-col md:flex-row items-center justify-between bg-polar p-6 rounded-lg">
              <div className="relative mb-4 md:mb-0 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Hledat články..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blumine font-raleway-regular"
                  aria-label="Vyhledávání článků"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Tag className="text-blumine" size={20} />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full md:w-auto border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blumine font-raleway-regular"
                  aria-label="Filtrovat podle tagu"
                >
                  <option value="">Všechny tagy</option>
                  {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-blumine mb-8">{sectionTitle}</h2>
              <div className="space-y-8">
                {remainingPosts.map((post) => (
                  <PostCardList key={post.id} post={post} />
                ))}
              </div>
            </div>
          </>
        )}

        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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