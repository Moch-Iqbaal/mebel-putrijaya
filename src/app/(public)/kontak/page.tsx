import Contact from '../../../views/Contact';
import { PAGE_META, pageMetadata } from '../../../seo';

export const metadata = pageMetadata(PAGE_META.kontak.title, PAGE_META.kontak.description, '/kontak');

export default function Page() {
  return <Contact />;
}
