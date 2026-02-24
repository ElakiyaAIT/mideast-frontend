import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useCmsPage } from '../../hooks/queries/useStaticPageApi';

const ContentPage = () => {
  const location = useLocation();
  const slug = location.pathname.slice(1); // remove leading "/"

  const { data: page, isLoading, isError } = useCmsPage(slug);

  // Update title & meta manually
  useEffect(() => {
    if (page) {
      document.title = page.metaTitle || page.title || 'Page';

      let metaTag = document.querySelector("meta[name='description']");
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'description');
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', page.metaDescription || '');
    }
  }, [page]);

  if (isLoading) return <div className='p-10'>Loading...</div>;
  if (isError || !page) return <div className='p-10 text-red-500'>Page not found</div>;

  return (
    <div className='container px-6 py-10 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>{page.title}</h1>

      <div
        className='prose max-w-none text-left'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(page.content || ''),
        }}
      />
    </div>
  );
};

export default ContentPage;
