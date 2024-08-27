import Link from 'next/link';
import Image from 'next/image';

export default function BlogPostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div>
        <Image src={post.feature_image} alt={post.title} width={300} height={200} />
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
}
