'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';

function isWhatsAppUrl(href: string): boolean {
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return false;
  }

  const host = url.hostname.toLowerCase();
  return host === 'wa.me' || host === 'www.wa.me' || host === 'api.whatsapp.com';
}

function isWhatsAppLink(node: Element): boolean {
  const anchor = node.closest('a');
  return anchor ? isWhatsAppUrl(anchor.href) : false;
}

export default function WhatsAppClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const track = () => {
      sendGAEvent('event', 'whatsapp_click', { page_path: pathname });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !isWhatsAppLink(target)) return;
      track();
    };

    document.addEventListener('click', onClick);

    const open = window.open.bind(window);
    window.open = (url?: string | URL, target?: string, features?: string) => {
      const href = url instanceof URL ? url.href : url;
      if (typeof href === 'string' && isWhatsAppUrl(href)) track();
      return open(url, target, features);
    };

    return () => {
      document.removeEventListener('click', onClick);
      window.open = open;
    };
  }, [pathname]);

  return null;
}
