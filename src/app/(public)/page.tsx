import Home from '../../views/Home';
import { PAGE_META, pageMetadata } from '../../seo';

export const metadata = pageMetadata(PAGE_META.home.title, PAGE_META.home.description, '/');

export default function Page() {
  return <Home />;
}
