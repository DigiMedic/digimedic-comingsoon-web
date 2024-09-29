'use client';

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import TableOfContents from "./TableOfContents";
import RelatedArticles from "./RelatedArticles";

const ShareButtons = dynamic(() => import("./ShareButtons"), { ssr: false });

interface FullArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export const FullArticle: React.FC<FullArticleProps> = ({ post, relatedPosts }) => {
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const updateReadProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress((scrolled / height) * 100);
    };

    window.addEventListener('scroll', updateReadProgress);
    return () => window.removeEventListener('scroll', updateReadProgress);
  }, []);

  const readingTime = Math.ceil((post.html?.split(" ").length || 0) / 200);

  const formattedDate = new Intl.DateTimeFormat('cs-CZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(post.published_at || ""));

  const processContent = (content: string) => {
    content = content.replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-3xl font-bold mt-12 mb-6 font-space">$1</h2>');
    content = content.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-2xl font-semibold mt-10 mb-4 font-space">$1</h3>');
    content = content.replace(/<h4>(.*?)<\/h4>/g, '<h4 class="text-xl font-semibold mt-8 mb-3 font-space">$1</h4>');
    content = content.replace(/<p>(.*?)<\/p>/g, '<p class="mb-6 text-lg leading-relaxed font-raleway">$1</p>');
    content = content.replace(/<ul>[\s\S]*?<\/ul>/g, (match) => `<ul class="list-disc pl-8 mb-6 space-y-2 font-raleway">${match.slice(4, -5)}</ul>`);
    content = content.replace(/<ol>[\s\S]*?<\/ol>/g, (match) => `<ol class="list-decimal pl-8 mb-6 space-y-2 font-raleway">${match.slice(4, -5)}</ol>`);
    content = content.replace(/<li>(.*?)<\/li>/g, '<li class="text-lg mb-2">$1</li>');
    content = content.replace(
      /<blockquote>[\s\S]*?<\/blockquote>/g,
      (match) => `<blockquote class="border-l-4 border-blue-500 pl-6 py-4 italic text-gray-600 my-8 font-raleway bg-blue-50 rounded-r-lg">${match.slice(12, -13)}</blockquote>`
    );
    return content;
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 font-raleway bg-white text-gray-900">
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
        style={{ width: `${readProgress}%` }}
      />
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center font-space leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            📅 {formattedDate}
          </span>
          {post.primary_author && typeof post.primary_author === 'object' && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              👤 Autor: {post.primary_author.name}
            </span>
          )}
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            ⏱️ {readingTime} min čtení
          </span>
        </div>
        {post.feature_image && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.feature_image}
              alt={post.title || ""}
              width={1000}
              height={500}
              layout="responsive"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
      </header>

      <TableOfContents content={post.html || ""} />

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: processContent(post.html || "") }}
      />

      <RelatedArticles posts={relatedPosts} />

      <footer className="mt-16 pt-8 border-t border-gray-200">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-space transition-colors duration-300 hover:bg-gray-300 cursor-pointer"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <ShareButtons url={`https://yourdomain.com/blog/${post.slug}`} title={post.title || ''} />
      </footer>
    </article>
  );
};

export default FullArticle;
