import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { productCopy } from '../lib/catalog';
import { whatsappHref } from '../seo';
import type { Product } from '../types';

export default function ProductDetail({
  product,
  categoryName,
  categoryHref,
}: {
  product: Product;
  categoryName: string;
  categoryHref: string;
}) {
  const copy = productCopy(product);
  const askHref = whatsappHref(
    `Halo Pak, Saya tertarik dengan ${product.name}. Boleh minta info harga dan ketersediaannya? 🙏`,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <nav aria-label="Jejak" className="mb-8 text-base text-gray-500">
        <Link href="/katalog" className="hover:text-primary">
          Katalog
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={categoryHref} className="hover:text-primary">
          {categoryName}
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page" className="text-gray-800">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative h-80 md:h-[32rem] overflow-hidden rounded-[2rem] bg-white border border-accent">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">{categoryName}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">{copy.heading}</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">{product.description}</p>
          <a
            href={askHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-md font-semibold text-lg"
          >
            <MessageCircle size={20} />
            Tanya via WhatsApp
          </a>
          <p className="mt-4 text-lg text-gray-600">Hubungi kami untuk harga.</p>
          <Link href={categoryHref} className="inline-block mt-8 text-primary font-bold text-lg hover:underline">
            Lihat {categoryName} lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}
