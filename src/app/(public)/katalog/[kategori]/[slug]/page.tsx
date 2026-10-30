import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '../../../../../views/ProductDetail';
import {
  categoryPath,
  getCategories,
  getCategory,
  getProduct,
  getProductsByCategory,
  productCopy,
  productPath,
} from '../../../../../lib/catalog';
import { pageMetadata } from '../../../../../seo';

type Params = { kategori: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getCategories().flatMap((category) =>
    getProductsByCategory(category.name).map((product) => ({
      kategori: category.slug,
      slug: product.slug,
    })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kategori, slug } = await params;
  const product = getProduct(kategori, slug);
  if (!product) return {};
  const copy = productCopy(product);
  return pageMetadata(copy.title, copy.description, productPath(kategori, product.slug), {
    url: product.image,
    alt: product.alt,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { kategori, slug } = await params;
  const category = getCategory(kategori);
  const product = getProduct(kategori, slug);
  if (!category || !product) notFound();

  return <ProductDetail product={product} categoryName={category.name} categoryHref={categoryPath(category.slug)} />;
}
