import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // `/path/` 308s to `/path`. Canonical, sitemap, and internal links use that final form.
  trailingSlash: false,
};

export default nextConfig;
