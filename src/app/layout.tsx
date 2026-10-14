import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { FURNITURE_STORE_JSON_LD, PAGE_META, SITE_ORIGIN } from '../seo';
import WhatsAppClickTracker from '../components/WhatsAppClickTracker';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: PAGE_META.home.title,
  description: PAGE_META.home.description,
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(FURNITURE_STORE_JSON_LD).replace(/</g, '\\u003c'),
          }}
        />
        {children}
        <WhatsAppClickTracker />
        <GoogleAnalytics gaId="G-H0631CK6FW" />
      </body>
    </html>
  );
}
