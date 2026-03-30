import AppProviders from './AppProviders';
import Home from '@/pages/Home';
import Impressum from '@/pages/Impressum';
import Datenschutz from '@/pages/Datenschutz';
import BlogOverview from '@/pages/blog/BlogOverview';
import BlogArticle from '@/pages/blog/BlogArticle';
import NotFound from '@/pages/NotFound';

const pages = {
  Home,
  Impressum,
  Datenschutz,
  BlogOverview,
  BlogArticle,
  NotFound
};

export default function ReactPage({ page, ...props }: { page: keyof typeof pages, [key: string]: any }) {
  const Component = pages[page];
  return (
    <AppProviders>
      <Component {...props} />
    </AppProviders>
  );
}
