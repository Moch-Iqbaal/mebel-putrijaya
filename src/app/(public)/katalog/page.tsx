import Catalog from '../../../views/Catalog';
import { pageMetadata } from '../../../seo';

export const metadata = pageMetadata(
  'Katalog Produk | Mebel Putri Jaya Randudongkal',
  'Temukan furnitur berkualitas untuk setiap sudut rumah Anda. Pilih kategori di bawah untuk mempermudah pencarian.',
  '/katalog',
);

export default function Page() {
  return <Catalog />;
}
