import type { MetadataRoute } from 'next';
import { getArticleSummaries } from '../lib/articles';
import { catalogPaths } from '../lib/catalog';
import { SITE_ORIGIN, SITEMAP_LASTMOD } from '../seo';

const STATIC_PATHS = ['/', '/katalog', '/kontak'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticleSummaries();
  const latestArticle = articles.reduce<Date | null>((latest, article) => {
    const date = new Date(`${article.date}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) return latest;
    if (!latest || date > latest) return date;
    return latest;
  }, null);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`,
    lastModified: SITEMAP_LASTMOD,
  }));

  const articleEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_ORIGIN}/artikel`,
      lastModified: latestArticle ?? SITEMAP_LASTMOD,
    },
    ...articles.map((article) => ({
      url: `${SITE_ORIGIN}/artikel/${article.slug}`,
      lastModified: new Date(`${article.date}T00:00:00.000Z`),
    })),
  ];

  const catalogEntries: MetadataRoute.Sitemap = catalogPaths().map((path) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: SITEMAP_LASTMOD,
  }));

  return [...staticEntries, ...articleEntries, ...catalogEntries];
}
