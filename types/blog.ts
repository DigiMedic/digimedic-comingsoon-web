export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  html: string | null;
  feature_image: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
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
  excerpt: string;
  content: string;
  html?: string;
  createdAt: string;
  updatedAt: string;
  feature_image?: string;
  tags?: Array<{ id: string; name: string }>;
  published_at: string;
  reading_time: number;
  primary_author?: {
    name: string;
  };
}
