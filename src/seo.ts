import type { Metadata } from 'next';

/** Change this when the custom domain is connected. */
export const SITE_ORIGIN = 'https://mebel-putrijaya.vercel.app';

export const PUBLIC_ROUTES = ['/', '/katalog', '/kontak'] as const;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Mebel Putri Jaya Randudongkal',
      locale: 'id_ID',
      type: 'website',
    },
  };
}
