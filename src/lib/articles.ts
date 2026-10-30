import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { SITE_ORIGIN } from '../seo';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'artikel');

/** Editorial order for the index and sitemap. */
const ARTICLE_ORDER = [
  'toko-mebel-pemalang-antar',
  'lemari-pakaian-kayu-besi-pemalang',
  'kasur-busa-randudongkal-ukuran',
  'kasur-busa-kempes-tanda-ganti-pemalang',
  'mebel-pengantin-baru-urutan-beli-pemalang',
  'merawat-mebel-kayu-musim-hujan-randudongkal',
];

const FAQ_BLOCK = /<!--\s*FAQPage JSON-LD:[\s\S]*?```json\s*([\s\S]*?)```\s*$/;

export type ArticleSummary = {
  title: string;
  description: string;
  slug: string;
  date: string;
};

export type Article = ArticleSummary & {
  html: string;
  faqJsonLd: Record<string, unknown> | null;
};

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function normalizeDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value ?? '').trim();
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(text);
  return match ? match[1] : text;
}

function sortArticles<T extends { slug: string; date: string }>(articles: T[]): T[] {
  return [...articles].sort((a, b) => {
    const ai = ARTICLE_ORDER.indexOf(a.slug);
    const bi = ARTICLE_ORDER.indexOf(b.slug);
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
  });
}

function markdownFiles(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith('.md'))
    .sort();
}

function readMarkdown(fileName: string): { summary: ArticleSummary; content: string } {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, fileName), 'utf8');
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const slugFallback = fileName.replace(/\.md$/, '');
  return {
    summary: {
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      slug: String(data.slug ?? slugFallback),
      date: normalizeDate(data.date),
    },
    content: parsed.content,
  };
}

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

function enhanceArticleHtml() {
  return (tree: HastNode) => {
    visit(tree);
  };
}

function visit(node: HastNode) {
  if (!node.children) return;

  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];

    if (child.type === 'element' && child.tagName === 'blockquote' && textOf(child).trim() === '') {
      node.children.splice(index, 1);
      index -= 1;
      continue;
    }

    if (child.type === 'element' && child.tagName === 'a') {
      const href = String(child.properties?.href ?? '');
      if (href.startsWith(SITE_ORIGIN)) {
        const next = href.slice(SITE_ORIGIN.length) || '/';
        child.properties = { ...child.properties, href: next.startsWith('/') ? next : `/${next}` };
      } else if (/^https?:\/\//.test(href)) {
        child.properties = {
          ...child.properties,
          target: '_blank',
          rel: 'noopener noreferrer',
        };
      }
    }

    if (child.type === 'element' && child.tagName === 'table') {
      visit(child);
      node.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['article-table'] },
        children: [child],
      };
      continue;
    }

    visit(child);
  }
}

function splitFaq(content: string): { body: string; faqJsonLd: Record<string, unknown> | null } {
  const match = FAQ_BLOCK.exec(content);
  if (!match || match.index === undefined) {
    return { body: content.trim(), faqJsonLd: null };
  }
  return {
    body: content.slice(0, match.index).trim(),
    faqJsonLd: JSON.parse(match[1]) as Record<string, unknown>,
  };
}

function renderMarkdown(markdown: string): string {
  const file = remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(enhanceArticleHtml)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(markdown);
  return String(file);
}

export function getArticleSummaries(): ArticleSummary[] {
  return sortArticles(markdownFiles().map((fileName) => readMarkdown(fileName).summary));
}

export function getArticle(slug: string): Article | undefined {
  const fileName = markdownFiles().find((name) => readMarkdown(name).summary.slug === slug);
  if (!fileName) return undefined;
  const { summary, content } = readMarkdown(fileName);
  const { body, faqJsonLd } = splitFaq(content);
  return {
    ...summary,
    html: renderMarkdown(body),
    faqJsonLd,
  };
}
