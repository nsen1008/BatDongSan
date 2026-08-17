import { useEffect } from 'react';

interface SeoConfig {
  title: string;
  description: string;
  image: string;
  url?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function useSeo({ title, description, image, url }: SeoConfig): void {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = 'vi';

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', 'index,follow');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:locale', 'vi_VN');
    if (url) upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
  }, [title, description, image, url]);
}