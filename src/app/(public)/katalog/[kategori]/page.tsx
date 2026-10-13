import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Catalog from '../../../../views/Catalog';
import { categoryCopy, getCategories, getCategory, getProductsByCategory } from '../../../../lib/catalog';
import { pageMetadata } from '../../../../seo';

type Params = { kategori: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getCategories().map((category) => ({ kategori: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kategori } = await params;
  const category = getCategory(kategori);
  if (!category) return {};
  const products = getProductsByCategory(category.name);
  const copy = categoryCopy(category, products);
  return pageMetadata(copy.title, copy.description, `/katalog/${category.slug}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { kategori } = await params;
  const category = getCategory(kategori);
  if (!category) notFound();

  const products = getProductsByCategory(category.name);
  const copy = categoryCopy(category, products);

  return (
    <Catalog
      heading={copy.heading}
      intro={copy.intro}
      products={products}
      categories={getCategories()}
      activeSlug={category.slug}
    />
  );
}
