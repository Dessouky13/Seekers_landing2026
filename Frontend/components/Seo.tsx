import React, { useEffect } from 'react';
import { SITE, ogImage } from '../src/siteConfig';

interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/solutions" — used for canonical + og:url. */
  path?: string;
  /** Absolute URL or site-relative path. */
  image?: string;
  type?: 'website' | 'article';
  /** Structured data (JSON-LD) object or array for this page. */
  jsonLd?: object | object[];
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const abs = (p: string) => (p.startsWith('http') ? p : SITE.url + p);

/**
 * Per-route SEO/GEO head manager. Sets document title, description, canonical,
 * Open Graph + Twitter cards, and injects page-specific JSON-LD structured data
 * (which generative engines lean on heavily). Base/default tags live in
 * index.html so non-JS crawlers still get a sensible baseline.
 */
const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path = '/',
  image = ogImage,
  type = 'website',
  jsonLd,
  noindex = false,
}) => {
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';
  useEffect(() => {
    const fullTitle = /seekers/i.test(title) ? title : `${title} | ${SITE.name}`;
    const url = SITE.url + (path === '/' ? '/' : path.replace(/\/$/, ''));
    const img = abs(image);

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);

    const ID = 'route-jsonld';
    document.getElementById(ID)?.remove();
    if (ld) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = ID;
      s.textContent = ld;
      document.head.appendChild(s);
    }
    return () => {
      document.getElementById(ID)?.remove();
    };
  }, [title, description, path, image, type, noindex, ld]);

  return null;
};

export default Seo;
