import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags?: { name: string }[];
  feature_image: string | null | undefined;
  reading_time?: number;
  published_at: string;
}

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-indigo-100 text-indigo-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
];

const getTagColor = (tagName: string) => {
  const index = tagName.length % tagColors.length;
  return tagColors[index];
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('cs-CZ', options);
};

export const PostCardList: React.FC<{ post: Post }> = ({ post }) => {
  if (!post || !post.slug) {
    return null;
  }

  return (
    <AnimatedCard
      link={`/blog/posts/${post.slug}`}
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden",
        "transition-standard hover:shadow-lg border border-powder-blue"
      )}
    >
      <div className="p-6">
        <h3 className="text-xl font-space-bold-regular text-blumine mb-3 line-clamp-2 transition-standard group-hover:text-fountain-blue">
          {post.title}
        </h3>
        <p className="text-sm font-raleway-regular text-astral mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center text-xs text-astral font-raleway-regular mr-4 mb-2 sm:mb-0">
            <span className="flex items-center mr-3">
              <Calendar size={12} className="mr-1" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {post.reading_time} min čtení
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 3).map(tag => (
              <span
                key={tag.name}
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-raleway-regular transition-standard",
                  getTagColor(tag.name)
                )}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};
