import type { Metadata } from 'next';
import { SITE_ORIGIN } from '../seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: 'Mebel Putri Jaya Randudongkal - Terbaik Se-Indonesia #1',
  description:
    'Temukan koleksi mebel berkualitas dengan desain ramah keluarga. Melayani dengan hati sejak bertahun-tahun di Randudongkal.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
