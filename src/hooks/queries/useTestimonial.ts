import { useQuery } from '@tanstack/react-query';
import {
  testimonialApi,
  type FilterTestimonialDto,
  type PaginatedResponseDto,
  type TestimonialDto,
} from '../../api/testimonialApi';
export const useTestimonials = (filters?: FilterTestimonialDto) => {
  return useQuery<PaginatedResponseDto<TestimonialDto>>({
    queryKey: ['testimonials', filters],
    queryFn: async () => {
      return testimonialApi.getTestimonials(filters);
    },
  });
};
