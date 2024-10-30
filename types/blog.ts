export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  custom_excerpt?: string;
  html?: string;
  feature_image?: string;
  tags?: Array<{ id: string; name: string }>;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  primary_author?: {
    name: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  html?: string; // Přidáno pro zpětnou kompatibilitu
  createdAt: string;
  updatedAt: string;
  feature_image?: string;
  tags?: Array<{ id: string; name: string }>;
  published_at?: string; // Přidáno
  primary_author?: {
    name: string;
    // další vlastnosti autora, pokud jsou potřeba
  };
  custom_excerpt?: string; // Přidání custom_excerpt
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  feature_image?: string;
  tags?: Array<{ id: string; name: string }>;
  published_at?: string;
  reading_time?: number;
}
