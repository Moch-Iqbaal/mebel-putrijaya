import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import {siteOrigin} from './site.config';
import {netlifyRedirects, robotsTxt, sitemapXml} from './siteFiles';

function siteSeoFiles(): Plugin {
  return {
    name: 'site-seo-files',
    apply: 'build',
    buildStart() {
      const publicDir = path.resolve(__dirname, 'public');
      fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt());
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml());
      fs.writeFileSync(path.join(publicDir, '_redirects'), netlifyRedirects());
    },
    transformIndexHtml(html) {
      const tag = `<link rel="canonical" href="${siteOrigin()}/" />`;
      if (html.includes('rel="canonical"')) {
        return html.replace(/<link\s+rel="canonical"[^>]*>/, tag);
      }
      return html.replace('</head>', `    ${tag}\n  </head>`);
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), siteSeoFiles()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
