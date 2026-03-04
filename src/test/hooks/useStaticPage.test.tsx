import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useCmsPage } from '../../hooks/queries/useStaticPageApi';
import { cmsPageApi } from '../../api/staticPagesApi';
import type { CmsPageDto } from '../../api/staticPagesApi';
// Mock the API
vi.mock('../../api/staticPagesApi', () => ({
  cmsPageApi: {
    getPage: vi.fn(),
  },
}));

// Helper to wrap hook in QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCmsPage', () => {
  const mockCmsPage: CmsPageDto = {
    slug: 'about-us',
    title: 'About Us',
    content: '<p>This is the about us page content</p>',
    metaTitle: 'About Us - Company',
    metaDescription: 'Learn more about our company',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch CMS page successfully when slug is provided', async () => {
    vi.mocked(cmsPageApi.getPage).mockResolvedValue(mockCmsPage);

    const { result } = renderHook(() => useCmsPage('about-us'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockCmsPage);
    expect(cmsPageApi.getPage).toHaveBeenCalledTimes(1);
    expect(cmsPageApi.getPage).toHaveBeenCalledWith('about-us');
  });

  it('should not fetch when slug is empty', async () => {
    const { result } = renderHook(() => useCmsPage(''), {
      wrapper: createWrapper(),
    });

    // When slug is empty, the query should not execute (enabled: false)
    expect(result.current.isFetching).toBe(false);
    expect(cmsPageApi.getPage).not.toHaveBeenCalled();
  });

  it('should not fetch when slug is undefined', async () => {
    const { result } = renderHook(() => useCmsPage(undefined), {
      wrapper: createWrapper(),
    });

    // When slug is undefined, the query should not execute (enabled: false)
    expect(result.current.isFetching).toBe(false);
    expect(cmsPageApi.getPage).not.toHaveBeenCalled();
  });

  it('should throw error when API returns error response', async () => {
    vi.mocked(cmsPageApi.getPage).mockRejectedValue(new Error('Page not found'));

    const { result } = renderHook(() => useCmsPage('non-existent'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Page not found');
  });

  it('should fetch page with all fields correctly', async () => {
    const fullCmsPage: CmsPageDto = {
      slug: 'contact',
      title: 'Contact Us',
      content: '<p>Contact content here</p>',
      metaTitle: 'Contact - Our Company',
      metaDescription: 'Get in touch with us',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z',
    };

    vi.mocked(cmsPageApi.getPage).mockResolvedValue(fullCmsPage);

    const { result } = renderHook(() => useCmsPage('contact'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.slug).toBe('contact');
    expect(result.current.data?.title).toBe('Contact Us');
    expect(result.current.data?.content).toBe('<p>Contact content here</p>');
    expect(result.current.data?.metaTitle).toBe('Contact - Our Company');
    expect(result.current.data?.metaDescription).toBe('Get in touch with us');
    expect(result.current.data?.createdAt).toBe('2024-01-01T00:00:00Z');
    expect(result.current.data?.updatedAt).toBe('2024-02-01T00:00:00Z');
  });
});
