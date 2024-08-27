"use client"
import React, { useEffect, useState } from 'react';
import * as api from '../../lib/ghost';
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Image from 'next/image';

const FeaturedPost = ({ post }) => (
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
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-blumine to-fountain-blue opacity-75"></div>
      <div className="relative p-8">
        <span className="bg-white text-blumine text-xs font-semibold px-2.5 py-0.5 rounded">Hlavní článek</span>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{post.title || 'Bez názvu'}</h2>
        <p className="text-white text-opacity-90 mb-6">{post.excerpt || 'Bez popisu'}</p>
        <Link href={`/posts/${post.slug}`} className="inline-flex items-center px-4 py-2 bg-white text-blumine rounded-full font-semibold hover:bg-polar transition-colors duration-300">
          Číst více <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  ) : null
);

const PostCard = ({ post }) => (
  post ? (
    <motion.article 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <Link href={`/posts/${post.slug}`} className="block">
        {post.feature_image && (
          <div className="relative h-48">
            <Image
              src={post.feature_image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-blumine mb-2">{post.title || 'Bez názvu'}</h3>
          {post.excerpt && <p className="text-astral mb-4 line-clamp-3">{post.excerpt}</p>}
          <div className="flex items-center text-sm text-fountain-blue">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="mr-4">{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Bez data'}</span>
            <Clock className="mr-2 h-4 w-4" />
            <span>{post.reading_time || '2'} min čtení</span>
          </div>
        </div>
      </Link>
      {post.tags && post.tags.length > 0 && (
        <div className="px-6 py-4 bg-polar">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-fountain-blue text-white">
                <Tag className="mr-1 h-3 w-3" />
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  ) : null
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
};

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const result = await api.getPaginatedPosts(1, 10);
        console.log('Fetched posts:', JSON.stringify(result, null, 2));
        if (result && Array.isArray(result)) {
          setPosts(result);
        } else if (result && result.posts && Array.isArray(result.posts)) {
          setPosts(result.posts);
        } else {
          console.error('Unexpected result structure:', result);
          setError('Neočekávaná struktura dat');
        }
      } catch (error) {
        console.error('Chyba při načítání příspěvků:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log('Current posts state:', posts);

  if (isLoading) {
    return <div>Načítání...</div>;
  }

  if (error) {
    return <div>Chyba při načítání článků: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>
      <p>Žádné články k zobrazení</p>
      <p>Zkontrolujte, zda jsou v Ghost CMS publikované nějaké články.</p>
    </div>;
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

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

      {featuredPost && (
        <section className="mb-16">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold text-blumine mb-8">Nejnovější články</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {remainingPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <footer className="mt-16 text-center">
        <p className="text-astral">
          © {new Date().getFullYear()} DigiMedic. Všechna práva vyhrazena.
        </p>
      </footer>
    </div>
  );
}