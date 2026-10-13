'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { categorySlugOf, productPath } from '../lib/catalog';
import { whatsappHref } from '../seo';
import type { Product } from '../types';

type CategoryLink = {
  name: string;
  slug: string;
};

export default function Catalog({
  heading,
  intro,
  products,
  categories,
  activeSlug,
}: {
  heading: string;
  intro: string;
  products: Product[];
  categories: CategoryLink[];
  activeSlug?: string;
}) {
  const handleBuy = (productName: string) => {
    window.open(
      whatsappHref(`Halo Pak, Saya tertarik dengan ${productName}. Boleh minta info harga dan ketersediaannya? 🙏`),
      '_blank',
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">{heading}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{intro}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-20">
        <Link
          href="/katalog"
          className={`px-8 py-4 rounded-xl text-lg font-medium transition-all ${
            activeSlug ? 'bg-white text-gray-600 hover:bg-gray-100' : 'bg-primary text-white shadow-lg'
          }`}
        >
          Semua
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/katalog/${cat.slug}`}
            className={`px-8 py-4 rounded-xl text-lg font-medium transition-all ${
              activeSlug === cat.slug
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {products.map((product) => {
            const href = productPath(categorySlugOf(product.category), product.slug);
            return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="category-card overflow-hidden group"
              >
                <Link href={href} className="relative block h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-white px-4 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                </Link>

                <div className="p-8">
                  <Link href={href} className="hover:text-primary transition-colors">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h2>
                  </Link>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-lg">{product.description}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={() => handleBuy(product.name)}
                      className="text-green-600 text-xl font-semibold underline hover:text-green-700 transition-colors"
                    >
                      Hubungi kami untuk harga
                    </button>
                    <button
                      onClick={() => handleBuy(product.name)}
                      className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-md"
                    >
                      <MessageCircle size={20} />
                      Tanya
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Maaf, produk di kategori ini belum tersedia.</p>
        </div>
      )}
    </div>
  );
}
