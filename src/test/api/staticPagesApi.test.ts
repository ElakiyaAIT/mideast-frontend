import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cmsPageApi, type CmsPageDto } from '../../api/staticPagesApi';

// Mock axios instance
const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));
vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: mockGet,
  },
}));

describe('cmsPageApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPage', () => {
    it('should fetch CMS page by slug successfully', async () => {
      const mockPage: CmsPageDto = {
        slug: 'about-us',
        title: 'About Us',
        content: '<p>About us content</p>',
        metaTitle: 'About Us - Company',
        metaDescription: 'Learn more about us',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockPage, message: 'Success' },
      });

      const result = await cmsPageApi.getPage('about-us');

      expect(mockGet).toHaveBeenCalledWith('/cms/pages/about-us');
      expect(result).toEqual(mockPage);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(cmsPageApi.getPage('about-us')).rejects.toThrow('Network error');
    });

    it('should fetch different page slugs', async () => {
      const mockPage: CmsPageDto = {
        slug: 'contact',
        title: 'Contact Us',
        content: '<p>Contact content</p>',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockPage, message: 'Success' },
      });

      const result = await cmsPageApi.getPage('contact');

      expect(mockGet).toHaveBeenCalledWith('/cms/pages/contact');
      expect(result.slug).toBe('contact');
    });
  });
});
