"use client"
import React, { useState, useEffect } from 'react';
import { getPosts } from '@/lib/ghost';
import { PostCard } from '@/components/PostCard';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, Tag } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags: { name: string }[];
}

const FeaturedPost: React.FC<{ post: Post }> = ({ post }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blumine to-fountain-blue opacity-75"></div>
    <div className="relative p-8">
      <span className="bg-white text-blumine text-xs font-semibold px-2.5 py-0.5 rounded">Hlavní článek</span>
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{post.title}</h2>
      <p className="text-white text-opacity-90 mb-6">{post.excerpt}</p>
      <Link href={`/blog/posts/${post.slug}`} className="inline-flex items-center px-4 py-2 bg-white text-blumine rounded-full font-semibold hover:bg-polar transition-colors duration-300">
        Číst více <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);

const PopularPosts: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="mb-16"
  >
    <h2 className="text-3xl font-bold text-blumine mb-8">Populární články</h2>
    <div className="grid gap-6 md:grid-cols-3">
      {posts.slice(0, 3).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </motion.section>
);

export default function BlogHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === '' || post.tags.some(tag => tag.name === selectedTag))
    );
    setFilteredPosts(results);
  }, [searchTerm, selectedTag, posts]);

  const tags = Array.from(new Set(posts.flatMap(post => post.tags.map(tag => tag.name))));

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-blumine mb-4">Žádné články k zobrazení</h2>
        <p className="text-lg text-gray-600">Zkontrolujte, zda jsou publikované nějaké články.</p>
      </div>
    );
  }

  const featuredPost = posts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-blumine sm:text-5xl md:text-6xl">
          Vítejte na blogu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blumine to-fountain-blue">DigiMedic</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-astral sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Objevte nejnovější trendy a inovace v digitalizaci zdravotnictví
        </p>
      </motion.header>

      {featuredPost && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <FeaturedPost post={featuredPost} />
        </motion.section>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Hledat články..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blumine"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex items-center space-x-2">
          <Tag className="text-blumine" size={20} />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blumine"
          >
            <option value="">Všechny tagy</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <PopularPosts posts={posts} />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-blumine mb-8">Nejnovější články</h2>
        <AnimatePresence>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {remainingPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.section>

      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-astral">
          © {new Date().getFullYear()} DigiMedic. Všechna práva vyhrazena.
        </p>
      </motion.footer>
    </div>
  );
}