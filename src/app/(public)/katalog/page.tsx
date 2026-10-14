import Catalog from '../../../views/Catalog';
import { PRODUCTS } from '../../../constants';
import { getCategories } from '../../../lib/catalog';
import { PAGE_META, pageMetadata } from '../../../seo';

export const metadata = pageMetadata(PAGE_META.katalog.title, PAGE_META.katalog.description, '/katalog');

export default function Page() {
  return (
    <Catalog
      heading="Katalog Produk"
      intro="Sofa, kursi tamu jati, lemari, meja rias, set tempat tidur, kasur busa, dan bantal di toko Randudongkal, Pemalang."
      products={PRODUCTS}
      categories={getCategories()}
    />
  );
}
