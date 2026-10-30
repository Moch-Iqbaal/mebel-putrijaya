import Home from '../../views/Home';
import { PAGE_META, pageMetadata, publicPath } from '../../seo';

export const metadata = pageMetadata(PAGE_META.home.title, PAGE_META.home.description, publicPath('/'));

export default function Page() {
  return <Home />;
}
