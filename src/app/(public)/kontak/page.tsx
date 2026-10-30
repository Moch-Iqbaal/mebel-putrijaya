import Contact from '../../../views/Contact';
import { PAGE_META, pageMetadata, publicPath } from '../../../seo';

export const metadata = pageMetadata(PAGE_META.kontak.title, PAGE_META.kontak.description, publicPath('/kontak'));

export default function Page() {
  return <Contact />;
}
