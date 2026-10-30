import type { Metadata } from 'next';

/** Change this when the custom domain is connected. */
export const SITE_ORIGIN = 'https://mebel-putrijaya.vercel.app';

/** Date of the catalog and storefront copy used in the sitemap. */
export const SITEMAP_LASTMOD = new Date('2026-10-13T00:00:00.000Z');

/**
 * Store facts used by JSON-LD and the public pages.
 * Edit address, phone, hours, and Instagram here.
 */
export const BUSINESS = {
  name: 'Mebel Putri Jaya Randudongkal',
  url: SITE_ORIGIN,
  telephone: '+62-821-1309-2518',
  phoneDisplay: '082113092518 (Muh Rozaki)',
  phonePretty: '+62 821 1309 2518',
  whatsappNumber: '6282113092518',
  description:
    'Toko mebel di Randudongkal, Pemalang. Menjual mebel berkualitas, sofa, lemari, meja rias, set tempat tidur, kasur busa, dan bantal.',
  address: {
    streetAddress: 'Jl. Lkr. Utara, RT.08/RW.01, Dusun I',
    addressLocality: 'Randudongkal',
    addressRegion: 'Jawa Tengah',
    postalCode: '52353',
    addressCountry: 'ID',
  },
  displayAddress:
    'Jl. Lkr. Utara, RT.08/RW.01, Dusun I, Randudongkal, Kec. Randudongkal, Kabupaten Pemalang, Jawa Tengah 52353',
  hours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '17:00',
    daysLabel: 'Senin - Minggu',
    timeLabel: '08.00 - 17.00 WIB',
  },
  areaServed: 'Kabupaten Pemalang',
  instagram: 'https://www.instagram.com/mebelputrijaya/',
  geo: {
    latitude: -7.0967664,
    longitude: 109.3186949,
  },
  imagePath: '/toko-mebel-putri-jaya.webp',
} as const;

export const PAGE_META = {
  home: {
    title: 'Mebel Putri Jaya Randudongkal - Terbaik Se-Indonesia #1',
    description:
      'Toko mebel di Randudongkal, Pemalang. Mebel berkualitas, sofa, lemari, meja rias, kasur busa. Lihat langsung di toko, buka tiap hari 08.00–17.00. Tanya WA.',
  },
  katalog: {
    title: 'Katalog Mebel: Sofa, Lemari, Kasur – Toko Mebel Randudongkal Pemalang',
    description:
      'Lihat katalog sofa, kursi tamu jati, lemari, meja rias, set tempat tidur, kasur busa, dan bantal di Mebel Putri Jaya Randudongkal, Pemalang.',
  },
  kontak: {
    title: 'Alamat & Kontak Toko Mebel Putri Jaya Randudongkal, Pemalang',
    description:
      'Jl. Lkr. Utara, Dusun I, Randudongkal, Pemalang. Buka setiap hari 08.00–17.00. Telepon/WA 0821-1309-2518. Antar ke Randudongkal dan sekitarnya.',
  },
  artikel: {
    title: 'Artikel Toko Mebel Randudongkal, Pemalang | Mebel Putri Jaya',
    description:
      'Belanja mebel di Randudongkal, Pemalang: lokasi toko dan antar, lemari kayu atau besi, ukuran kasur, tanda ganti kasur, urutan pengantin, rawat kayu hujan.',
  },
} as const;

export const FURNITURE_STORE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: BUSINESS.name,
  url: BUSINESS.url,
  image: `${SITE_ORIGIN}${BUSINESS.imagePath}`,
  telephone: BUSINESS.telephone,
  description: BUSINESS.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: BUSINESS.hours.dayOfWeek,
      opens: BUSINESS.hours.opens,
      closes: BUSINESS.hours.closes,
    },
  ],
  areaServed: BUSINESS.areaServed,
  sameAs: [BUSINESS.instagram],
};

export function whatsappHref(text: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Storefront photo used when a page does not set its own og:image. */
export const DEFAULT_OG_IMAGE = {
  url: BUSINESS.imagePath,
  width: 712,
  height: 1004,
  alt: 'Tampak depan toko Mebel Putri Jaya di Randudongkal, Pemalang',
} as const;

/**
 * Public path with no trailing slash, except `/`.
 * Matches `trailingSlash: false`, so the href is the URL after the 308.
 */
export function publicPath(path: string): string {
  if (path.startsWith(SITE_ORIGIN)) {
    const rest = path.slice(SITE_ORIGIN.length) || '/';
    return publicPath(rest.startsWith('/') ? rest : `/${rest}`);
  }

  if (!path.startsWith('/')) return path;

  const hashIndex = path.indexOf('#');
  const hash = hashIndex === -1 ? '' : path.slice(hashIndex);
  const beforeHash = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const queryIndex = beforeHash.indexOf('?');
  const query = queryIndex === -1 ? '' : beforeHash.slice(queryIndex);
  const pathname = queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return `${trimmed}${query}${hash}`;
}

/** Absolute URL in the same form Next emits for canonical and og:url. */
export function absoluteUrl(path: string): string {
  const normalized = publicPath(path.startsWith('/') ? path : `/${path}`);
  return normalized === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${normalized}`;
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: { url: string; alt: string },
): Metadata {
  const canonical = absoluteUrl(path);
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
      images: [image ?? DEFAULT_OG_IMAGE],
    },
    twitter: {
      title,
      description,
    },
  };
}
