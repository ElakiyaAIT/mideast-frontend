import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  testimonialApi,
  type TestimonialDto,
  type PaginatedResponseDto,
} from '../../api/testimonialApi';

// Mock axios instance
const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));
vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: mockGet,
  },
}));

describe('testimonialApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTestimonials', () => {
    it('should fetch testimonials with default filters', async () => {
      const mockTestimonials: TestimonialDto[] = [
        {
          _id: '1',
          name: 'John Doe',
          role: 'CEO, Company',
          review: 'Great service!',
          image: 'john.jpg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z',
        },
      ];

      const mockResponse: PaginatedResponseDto<TestimonialDto> = {
        items: mockTestimonials,
        pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Success' },
      });

      const result = await testimonialApi.getTestimonials();

      expect(mockGet).toHaveBeenCalledWith('/testimonials', { params: undefined });
      expect(result.items).toHaveLength(1);
    });

    it('should fetch testimonials with custom filters', async () => {
      const mockResponse: PaginatedResponseDto<TestimonialDto> = {
        items: [],
        pagination: { total: 0, page: 1, limit: 5, totalPages: 0 },
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Success' },
      });

      const result = await testimonialApi.getTestimonials({ page: 1, limit: 5, search: 'test' });

      expect(mockGet).toHaveBeenCalledWith('/testimonials', {
        params: { page: 1, limit: 5, search: 'test' },
      });
      expect(result.pagination.limit).toBe(5);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(testimonialApi.getTestimonials()).rejects.toThrow('Network error');
    });
  });
});
