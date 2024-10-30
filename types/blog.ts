export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  html: string | null;
  feature_image: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  excerpt: string | null;
  custom_excerpt: string | null;
  reading_time: number;
  tags?: Array<{
    id: string;
    name: string;
  }> | null;
  primary_author?: {
    name: string;
  } | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  publishedAt: Date;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  published_at: string;
  reading_time: number;
}
