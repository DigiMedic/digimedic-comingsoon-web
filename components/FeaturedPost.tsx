// components/FeaturedPost.tsx
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  feature_image?: string;
  reading_time?: number;
  published_at: string;
  tags: { name: string }[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
};

const FeaturedPost: React.FC<{ post: Post }> = ({ post }) => (
  <Link href={`/blog/posts/${post.slug}`} className="block">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-lg shadow-lg",
        "transition-standard hover:shadow-xl mb-12"
      )}
    >
      <div className="relative h-96 sm:h-[28rem]">
        {post.feature_image ? (
          <Image
            src={post.feature_image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-standard group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
        <span className="bg-fountain-blue text-white text-xs font-raleway-regular px-2 py-1 rounded-full mb-3 self-start">
          Hlavní článek
        </span>
        <h2 className="text-2xl sm:text-3xl font-space-bold-regular mb-3 line-clamp-2 transition-standard group-hover:text-fountain-blue">
          {post.title}
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-raleway-regular mb-4">
          <div className="mb-2 sm:mb-0">
            <span className="flex items-center mb-1 sm:mb-0 sm:mr-4">
              <Calendar size={16} className="mr-2" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-2" />
              {post.reading_time} min čtení
            </span>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 3).map(tag => (
                <span
                  key={tag.name}
                  className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/20 transition-standard hover:bg-white/30"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <span className="text-sm font-raleway-regular flex items-center group transition-standard hover:text-fountain-blue">
              Číst dále
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default FeaturedPost;
