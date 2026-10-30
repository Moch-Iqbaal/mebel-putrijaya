import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleQuestionForm from '../../../../components/ArticleQuestionForm';
import { articleIndexPath, articlePath, getArticle, getArticleSummaries } from '../../../../lib/articles';
import { absoluteUrl, pageMetadata, publicPath } from '../../../../seo';

type Params = { slug: string };

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getArticleSummaries().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata(article.title, article.description, articlePath(article.slug));
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const faqJsonLd = article.faqJsonLd
    ? JSON.stringify(article.faqJsonLd).replace(/</g, '\\u003c')
    : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <nav aria-label="Jejak" className="mb-8 text-base text-gray-500">
        <Link href={publicPath('/')} className="hover:text-primary">
          Beranda
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={articleIndexPath()} className="hover:text-primary">
          Artikel
        </Link>
      </nav>

      <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </p>

      <div className="article-prose" dangerouslySetInnerHTML={{ __html: article.html }} />

      <ArticleQuestionForm
        articleTitle={article.title}
        articleUrl={absoluteUrl(articlePath(article.slug))}
      />

      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      ) : null}
    </article>
  );
}
