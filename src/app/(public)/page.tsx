import Home from '../../views/Home';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata(
  'Mebel Putri Jaya Randudongkal - Furniture Berkualitas untuk Hunian Anda',
  'Temukan koleksi mebel berkualitas dengan desain ramah keluarga. Melayani dengan hati sejak bertahun-tahun di Randudongkal.',
  '/',
);

export default function Page() {
  return <Home />;
}
