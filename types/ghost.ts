export interface GhostPost {
    slug: string;
    title: string;
    excerpt?: string;
    feature_image?: string | null;
    published_at: string;
    reading_time: number;
    html: string;
    primary_author: {
      name: string;
      profile_image?: string | null;
    };
    tags?: Array<{ id: string; name: string }>;
  }