import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags: { name: string }[];
  feature_image?: string;
}

const useInfiniteScroll = (allPosts: Post[] | undefined, initialLimit = 10) => {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    if (allPosts && allPosts.length > 0) {
      setDisplayedPosts(allPosts.slice(0, limit));
    }
  }, [allPosts, limit]);

  const loadMore = () => {
    setLimit(prevLimit => prevLimit + 10);
  };

  const hasMore = allPosts ? limit < allPosts.length : false;

  return { displayedPosts, loadMore, hasMore };
};

export default useInfiniteScroll;