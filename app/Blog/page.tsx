"use client"
import React, { useEffect, useState, useMemo } from 'react';
import * as api from '../../lib/ghost';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, Search } from "lucide-react";
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { GhostPost } from '@/lib/ghost';

const FeaturedPost: React.FC<{ post: GhostPost }> = React.memo(({ post }) => (
  post ? (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      {post.feature_image && (
        <Image
          src={post.feature_image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-blumine to-fountain-blue opacity-75"></div>
      <div className="relative p-8">
        <span className="bg-white text-blumine text-xs font-semibold px-2.5 py-0.5 rounded">Hlavní článek</span>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{post.title || 'Bez názvu'}</h2>
        <p className="text-white text-opacity-90 mb-6">{post.excerpt || 'Bez popisu'}</p>
        <Link href={`/blog/${post.slug}`} className="block flex-grow">
          Číst více <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  ) : null
));

const PostCard: React.FC<{ post: GhostPost }> = React.memo(({ post }) => (
  post ? (
    <motion.article 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block flex-grow">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blumine to-fountain-blue flex items-center justify-center">
              <span className="text-white text-2xl font-bold">DigiMedic</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="bg-blumine text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {post.tags && post.tags.length > 0 ? post.tags[0].name : 'Blog'}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-xl font-bold text-blumine mb-2 line-clamp-2 hover:text-fountain-blue transition-colors duration-200">
              {post.title || 'Bez názvu'}
            </h3>
            {post.excerpt && (
              <p className="text-astral mb-4 line-clamp-3 text-sm">
                {post.excerpt}
              </p>
            )}
          </div>
          <div className="flex items-center text-sm text-fountain-blue mt-4">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="mr-4">{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Bez data'}</span>
            <Clock className="mr-2 h-4 w-4" />
            <span>{post.reading_time || '2'} min čtení</span>
          </div>
        </div>
      </Link>
      {post.tags && post.tags.length > 0 && (
        <div className="px-6 py-4 bg-polar border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: any) => (
              <span key={tag.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-fountain-blue text-white hover:bg-blumine transition-colors duration-200">
                <Tag className="mr-1 h-3 w-3" />
                {tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.article>
  ) : null
));

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = React.memo(({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page ? 'bg-blumine text-white' : 'bg-white text-blumine'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
});

export default function BlogHome() {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const result = await api.getPaginatedPosts(currentPage, 10);
        if (Array.isArray(result)) {
          setPosts(result);
          setTotalPages(Math.ceil(result.length / 10)); // Předpokládáme, že celkový počet příspěvků je v result
        } else {
          setError('Neočekávaná struktura dat');
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedTag || post.tags?.some(tag => tag.name === selectedTag))
    );
  }, [posts, searchTerm, selectedTag]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blumine"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Chyba při načítání článků</h2>
        <p className="text-lg text-gray-600">{error}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-blumine mb-4">Žádné články k zobrazení</h2>
        <p className="text-lg text-gray-600">Zkontrolujte, zda jsou v Ghost CMS publikované nějaké články.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blumine sm:text-5xl md:text-6xl">
          Vítejte na blogu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blumine to-fountain-blue">DigiMedic</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-astral sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Objevte nejnovější trendy a inovace v digitalizaci zdravotnictví
        </p>
      </header>

      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Hledat články..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <AnimatePresence>
        {featuredPost && (
          <motion.section 
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-16"
          >
            <FeaturedPost post={featuredPost} />
          </motion.section>
        )}

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blumine mb-8 border-b-2 border-fountain-blue pb-2">Nejnovější články</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </AnimatePresence>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <footer className="mt-16 text-center">
        <p className="text-astral">
          © {new Date().getFullYear()} DigiMedic. Všechna práva vyhrazena.
        </p>
      </footer>
    </div>
  );
}