import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PUBLIC_ROUTES, canonicalUrl } from '../../site.config';

const PUBLIC = new Set<string>(PUBLIC_ROUTES);

/**
 * Points each public route at the primary host. The shared index.html
 * can only declare the homepage canonical; this updates it after navigation
 * so /katalog and /kontak are not treated as copies of the homepage.
 * Admin routes are noindex because the SPA fallback makes them directly loadable.
 */
export default function Canonical() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const head = document.head;
    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let robots = head.querySelector<HTMLMetaElement>('meta[name="robots"]');

    if (PUBLIC.has(pathname)) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        head.appendChild(canonical);
      }
      canonical.href = canonicalUrl(pathname);
      robots?.remove();
      return;
    }

    canonical?.remove();
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      head.appendChild(robots);
    }
    robots.content = 'noindex';
  }, [pathname]);

  return null;
}
