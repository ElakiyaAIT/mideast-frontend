// hooks/queries/useCmsPage.ts
import { useQuery } from '@tanstack/react-query';
import { cmsPageApi } from '../../api/staticPagesApi';

// api/cmsPageApi.ts
export interface CmsPageDto {
  slug?: string;
  title?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}
export const useCmsPage = (slug?: string) => {
  return useQuery<CmsPageDto>({
    queryKey: ['cms-page', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required');
      return cmsPageApi.getPage(slug);
    },
    enabled: !!slug, // only fetch if slug exists
  });
};
