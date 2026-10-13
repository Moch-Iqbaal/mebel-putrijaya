import { PRODUCTS } from '../constants';
import type { Product } from '../types';

const CATEGORY_DEFS: Record<Product['category'], { slug: string; emoji: string }> = {
  Sofa: { slug: 'sofa', emoji: '🛋️' },
  Kursi: { slug: 'kursi', emoji: '🪑' },
  Meja: { slug: 'meja', emoji: '🍽️' },
  Lemari: { slug: 'lemari', emoji: '🚪' },
  'Kasur Busa': { slug: 'kasur-busa', emoji: '🛏️' },
  Bantal: { slug: 'bantal', emoji: '☁️' },
};

const CATEGORY_ORDER: Product['category'][] = ['Sofa', 'Kursi', 'Meja', 'Lemari', 'Kasur Busa', 'Bantal'];

export type CatalogCategory = {
  name: Product['category'];
  slug: string;
  emoji: string;
};

/** Categories that currently have at least one product, in storefront order. */
export function getCategories(): CatalogCategory[] {
  return CATEGORY_ORDER.filter((name) => PRODUCTS.some((product) => product.category === name)).map((name) => ({
    name,
    slug: CATEGORY_DEFS[name].slug,
    emoji: CATEGORY_DEFS[name].emoji,
  }));
}

export function getCategory(slug: string): CatalogCategory | undefined {
  return getCategories().find((category) => category.slug === slug);
}

export function categorySlugOf(category: Product['category']): string {
  return CATEGORY_DEFS[category].slug;
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function getProduct(categorySlug: string, slug: string): Product | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  return PRODUCTS.find((product) => product.category === category.name && product.slug === slug);
}

export function categoryPath(slug: string): string {
  return `/katalog/${slug}`;
}

export function productPath(categorySlug: string, slug: string): string {
  return `/katalog/${categorySlug}/${slug}`;
}

export function categoryCopy(category: CatalogCategory, products: Product[]) {
  const heading = `${category.name} di Randudongkal, Pemalang`;
  const listed = products.map((product) => product.name).join(', ');
  return {
    heading,
    title: `${heading} | Mebel Putri Jaya`,
    description: `${listed} di Mebel Putri Jaya, toko mebel Randudongkal, Pemalang. Lihat langsung di toko, buka setiap hari 08.00–17.00.`,
    intro: `${listed} di toko Mebel Putri Jaya Randudongkal, Pemalang.`,
  };
}

export function productCopy(product: Product) {
  const heading = `${product.name} di Randudongkal, Pemalang`;
  return {
    heading,
    title: `${heading} | Mebel Putri Jaya`,
    description: `${product.description} Tersedia di Mebel Putri Jaya, toko mebel Randudongkal, Pemalang.`,
  };
}

/** Category and product URLs derived from products that exist today. */
export function catalogPaths(): string[] {
  return getCategories().flatMap((category) => [
    categoryPath(category.slug),
    ...getProductsByCategory(category.name).map((product) => productPath(category.slug, product.slug)),
  ]);
}
