import { PUBLIC_ROUTES, canonicalUrl, siteOrigin } from './site.config';

export function robotsTxt(): string {
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    '',
    `Sitemap: ${siteOrigin()}/sitemap.xml`,
    '',
  ].join('\n');
}

export function sitemapXml(): string {
  const urls = PUBLIC_ROUTES.map(
    (path) => `  <url>\n    <loc>${canonicalUrl(path)}</loc>\n  </url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** Netlify-only. Vercel does not read `_redirects`. */
export function netlifyRedirects(): string {
  return [
    '# Netlify only. Vercel does not read this file.',
    '# 301 every path to the same path on the primary host.',
    '# The ! forces the redirect even when a file exists at that path.',
    `/*    ${siteOrigin()}/:splat    301!`,
    '',
  ].join('\n');
}
