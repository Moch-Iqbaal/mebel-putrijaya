import type { MetadataRoute } from 'next';
import { catalogPaths } from '../lib/catalog';
import { SITE_ORIGIN, SITEMAP_LASTMOD } from '../seo';

const STATIC_PATHS = ['/', '/katalog', '/kontak'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [...STATIC_PATHS, ...catalogPaths()].map((path) => ({
    url: path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`,
    lastModified: SITEMAP_LASTMOD,
  }));
}
