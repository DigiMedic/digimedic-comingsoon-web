// components/FeaturedPost.tsx
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  feature_image?: string;
}

export const FeaturedPost: React.FC<{ post: Post }> = ({ post }) => (
  <Link href={`/blog/posts/${post.slug}`} className="block">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-12"
    >
      <div className="relative h-96">
        {post.feature_image ? (
          <Image
            src={post.feature_image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blumine to-fountain-blue flex items-center justify-center p-6">
            <h2 className="text-white text-3xl font-space-bold-regular text-center">{post.title}</h2>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blumine/80 via-blumine/40 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <span className="bg-fountain-blue text-white text-xs font-raleway-regular px-2 py-1 rounded-full mb-3 inline-block">Hlavní článek</span>
        {post.feature_image && <h2 className="text-3xl font-space-bold-regular mb-2">{post.title}</h2>}
        <p className="text-sm font-raleway-regular mb-4">{post.excerpt}</p>
        <span className="text-sm font-raleway-regular flex items-center">
          Číst dále <ArrowRight className="ml-2" size={16} />
        </span>
      </div>
    </motion.div>
  </Link>
);