'use client';

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import ShareButton from "./ShareButton";
import TableOfContents from "./TableOfContents";
import RelatedArticles from "./RelatedArticles";
import Comments from "./Comments";

const ShareButtons = dynamic(() => import("./ShareButtons"), { ssr: false });

interface FullArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export const FullArticle: React.FC<FullArticleProps> = ({ post, relatedPosts }) => {
  const [readProgress, setReadProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateReadProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress((scrolled / height) * 100);
    };

    window.addEventListener('scroll', updateReadProgress);
    return () => window.removeEventListener('scroll', updateReadProgress);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const readingTime = Math.ceil((post.html?.split(" ").length || 0) / 200);

  const formattedDate = new Intl.DateTimeFormat('cs-CZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(post.published_at || ""));

  return (
    <article className={`mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 font-raleway relative overflow-hidden ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
        aria-label={isDarkMode ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
        style={{ width: `${readProgress}%` }}
      />
      <header className="mb-16 text-center relative z-10">
        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-blumine font-space">
          {post.title}
        </h1>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <time dateTime={post.published_at || ""} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {formattedDate}
          </time>
          {post.primary_author && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Autor: {post.primary_author.name}
            </div>
          )}
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {readingTime} min čtení
          </div>
        </div>
        {post.feature_image && (
          <div className="relative mb-16 h-72 sm:h-96 rounded-lg overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105">
            <Image
              src={post.feature_image}
              alt={post.title || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
      </header>
      
      <TableOfContents content={post.html || ""} />
      
      <div
        className={`prose prose-lg sm:prose-xl mx-auto max-w-none leading-relaxed relative z-10 ${
          isDarkMode ? 'prose-invert' : ''
        } 
        prose-headings:font-space prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
        prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
        prose-p:mb-6 prose-p:text-justify
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:ml-4 prose-li:mb-2
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
        prose-img:rounded-lg prose-img:shadow-md
        prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-md
        prose-code:text-sm prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded`}
        dangerouslySetInnerHTML={{ __html: post.html || "" }}
      />
      
      <RelatedArticles posts={relatedPosts} />
      
      <Comments postId={post.id} />
      
      <footer className="mt-20 border-t border-gray-200 pt-10 relative z-10">
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-blue-600 transition-colors duration-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <ShareButtons
          url={`https://yourdomain.com/blog/${post.slug}`}
          title={post.title}
        />
      </footer>
    </article>
  );
};

export default FullArticle;