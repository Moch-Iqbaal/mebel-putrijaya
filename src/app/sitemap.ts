import type { MetadataRoute } from 'next';
import { PUBLIC_ROUTES, SITE_ORIGIN } from '../seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((path) => ({
    url: path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`,
  }));
}
