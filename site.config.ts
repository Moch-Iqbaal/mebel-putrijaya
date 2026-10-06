/**
 * Public origin for canonical URLs, robots.txt, and sitemap.xml.
 * Change this when the custom domain is connected, then rebuild.
 * The production build rewrites public/robots.txt, public/sitemap.xml,
 * and public/_redirects from this value.
 */
export const SITE_ORIGIN = 'https://mebel-putrijaya.vercel.app';

/**
 * Indexable paths. Keep these in sync with the public routes in src/App.tsx.
 * Admin routes are omitted on purpose.
 */
export const PUBLIC_ROUTES = ['/', '/katalog', '/kontak'] as const;

export function siteOrigin(): string {
  return SITE_ORIGIN.replace(/\/$/, '');
}

export function canonicalUrl(pathname: string): string {
  const origin = siteOrigin();
  if (pathname === '/' || pathname === '') return `${origin}/`;
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}
