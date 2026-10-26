import Link from 'next/link';
import { getArticleSummaries } from '../../../lib/articles';
import { PAGE_META, pageMetadata } from '../../../seo';

export const dynamic = 'force-static';

export const metadata = pageMetadata(PAGE_META.artikel.title, PAGE_META.artikel.description, '/artikel');

export default function Page() {
  const articles = getArticleSummaries();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">Artikel</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Panduan belanja mebel di Randudongkal, Pemalang: lokasi toko, memilih lemari, ukuran kasur busa, dan tanda kasur busa harus diganti.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/artikel/${article.slug}`}
              className="flex h-full flex-col gap-4 rounded-3xl border border-accent bg-white p-8 shadow-sm transition-colors hover:border-primary"
            >
              <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
              <p className="text-lg leading-relaxed text-gray-600">{article.description}</p>
              <span className="mt-auto font-bold text-primary">Baca artikel</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
