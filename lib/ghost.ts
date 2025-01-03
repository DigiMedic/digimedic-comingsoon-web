import { GhostAPIResponse } from './ghost.types';
import { ghostConfig } from '../config/ghost.config';
import { BlogPost, GhostPost } from '@/types/blog';

// Funkce pro získání bezpečné URL
function getSecureGhostUrl() {
  const url = process.env.NEXT_PUBLIC_GHOST_URL || ghostConfig.api.url;
  
  if (!url) {
    console.error('Ghost URL není nastavena');
    return null;
  }
  
  console.log('Původní Ghost URL:', url);

  // Pokud je vypnuté vynucení HTTPS, vrátíme původní URL
  if (!ghostConfig.security.enforceHttps) {
    console.log('HTTPS není vynuceno, používám původní URL');
    return url;
  }
  
  // V development módu nebo při povoleném HTTP
  if ((process.env.NODE_ENV === 'development' || ghostConfig.security.allowInsecure) && url.startsWith('http://')) {
    console.log('Používám HTTP URL');
    return url;
  }

  // Pokud URL již používá HTTPS, použijeme ji
  if (url.startsWith('https://')) {
    console.log('URL již používá HTTPS');
    return url;
  }

  // Pokud máme IP adresu
  const ipMatch = url.match(/\d+\.\d+\.\d+\.\d+/);
  if (ipMatch) {
    const ip = ipMatch[0];
    let port = '';
    
    try {
      const urlObj = new URL(url);
      if (urlObj.port) {
        port = `:${urlObj.port}`;
      }
    } catch (e) {
      console.warn('Nepodařilo se zpracovat port z URL:', e);
    }
    
    // Pokud je vypnuté vynucení HTTPS, použijeme HTTP
    const protocol = ghostConfig.security.enforceHttps ? 'https' : 'http';
    const secureUrl = `${protocol}://${ip}${port}`;
    console.log('Používám IP URL:', secureUrl);
    return secureUrl;
  }

  // Jinak vrátíme původní URL s HTTPS
  const secureUrl = url.replace(/^http:\/\//, 'https://');
  console.log('Převádím na HTTPS URL:', secureUrl);
  return secureUrl;
}

export function convertGhostPostToBlogPost(post: GhostPost): BlogPost {
  const safeDate = (dateStr: string | null): Date => {
    if (!dateStr) return new Date();
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.html || '',
    imageUrl: post.feature_image,
    publishedAt: safeDate(post.published_at),
    excerpt: post.excerpt || '',
    createdAt: safeDate(post.created_at),
    updatedAt: safeDate(post.updated_at),
    published_at: post.published_at || new Date().toISOString(),
    reading_time: post.reading_time || 0,
  };
}

export async function getPosts(): Promise<GhostPost[]> {
  console.log('Načítám příspěvky...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('NEXT_PUBLIC_GHOST_URL:', process.env.NEXT_PUBLIC_GHOST_URL);
  
  const secureUrl = getSecureGhostUrl();
  if (!secureUrl) {
    console.error('Nepodařilo se získat Ghost API URL');
    return [];
  }

  const key = process.env.NEXT_PUBLIC_GHOST_KEY || ghostConfig.api.key;
  if (!key) {
    console.error('Chybí Ghost API key');
    return [];
  }

  const url = `${secureUrl}${ghostConfig.endpoints.posts}/?key=${key}&include=${ghostConfig.defaultParams.include}&limit=${ghostConfig.defaultParams.limit}`;
  
  try {
    console.log('Odesílám požadavek na:', url);
    
    const response = await fetch(url, {
      next: {
        revalidate: ghostConfig.caching.revalidate
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${ghostConfig.caching.revalidate}, stale-while-revalidate=${ghostConfig.caching.staleWhileRevalidate}`
      }
    });

    if (!response.ok) {
      console.error('Ghost API response error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });

      const text = await response.text();
      console.error('Response text:', text);
      
      return [];
    }

    const data = await response.json() as GhostAPIResponse;
    console.log(`Úspěšně načteno ${data.posts.length} příspěvků`);
    return data.posts;
  } catch (error) {
    console.error('Chyba při načítání příspěvků:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  console.log('Načítám příspěvek se slugem:', slug);
  
  const secureUrl = getSecureGhostUrl();
  if (!secureUrl) {
    console.error('Nepodařilo se získat Ghost API URL');
    return null;
  }

  const key = process.env.NEXT_PUBLIC_GHOST_KEY || ghostConfig.api.key;
  if (!key) {
    console.error('Chybí Ghost API key');
    return null;
  }

  try {
    const url = new URL(`${ghostConfig.endpoints.posts}/slug/${slug}`, secureUrl);
    url.searchParams.append('key', key);
    url.searchParams.append('include', ghostConfig.defaultParams.include);

    console.log('Odesílám požadavek na:', url.toString());

    const response = await fetch(url.toString(), {
      next: {
        revalidate: ghostConfig.caching.revalidate
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${ghostConfig.caching.revalidate}, stale-while-revalidate=${ghostConfig.caching.staleWhileRevalidate}`
      }
    });

    if (!response.ok) {
      console.error('Ghost API response error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });

      const text = await response.text();
      console.error('Response text:', text);

      return null;
    }

    const data = await response.json() as GhostAPIResponse;
    if (data.posts[0]) {
      console.log('Příspěvek úspěšně načten');
    } else {
      console.log('Příspěvek nebyl nalezen');
    }
    return data.posts[0] || null;
  } catch (error) {
    console.error('Chyba při načítání příspěvku:', error);
    return null;
  }
}
