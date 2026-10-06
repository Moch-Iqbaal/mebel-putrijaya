import Contact from '../../../views/Contact';
import { pageMetadata } from '../../../seo';

export const metadata = pageMetadata(
  'Hubungi Kami | Mebel Putri Jaya Randudongkal',
  'Kami siap membantu Anda menemukan furniture impian. Silahkan hubungi kami melalui kontak berikut atau kunjungi toko kami langsung.',
  '/kontak',
);

export default function Page() {
  return <Contact />;
}
