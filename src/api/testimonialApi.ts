import type { ApiResponse } from '../dto/api.dto';
import axiosInstance from './axiosInstance';

export interface TestimonialDto {
  _id: string;
  name: string;
  role: string;
  review: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterTestimonialDto {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponseDto<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export const testimonialApi = {
  /**
   * Get testimonials (paginated)
   */
  getTestimonials: async (
    filters?: FilterTestimonialDto,
  ): Promise<PaginatedResponseDto<TestimonialDto>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedResponseDto<TestimonialDto>>>(
      '/testimonials',
      {
        params: filters,
      },
    );

    return response.data.data;
  },
};
