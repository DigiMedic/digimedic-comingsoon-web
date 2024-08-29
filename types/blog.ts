export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  date: string;
  readingTime: number;
  content: string;
  author?: {
    name: string;
    image?: string;
  };
  tags?: string[];
}
