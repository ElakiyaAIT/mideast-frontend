// api/cmsPageApi.ts
import type { ApiResponse } from '../dto/api.dto';
import axiosInstance from './axiosInstance';

export interface CmsPageDto {
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const cmsPageApi = {
  /**
   * Get a single CMS page by slug
   */
  getPage: async (slug: string): Promise<CmsPageDto> => {
    const response = await axiosInstance.get<ApiResponse<CmsPageDto>>(`/cms/pages/${slug}`);
    return response.data.data; // same pattern as testimonialApi
  },
};
