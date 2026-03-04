import { vi } from 'vitest';
import React from 'react';

// ============================================================
// MOCKS
// ============================================================

vi.mock('../../api/testimonialApi', () => ({
  testimonialApi: {
    getTestimonials: vi.fn(),
  },
}));

vi.mock('../../utils', () => ({
  showToast: {
    success: vi.fn(),
  },
}));

// ============================================================
// IMPORTS
// ============================================================

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useTestimonials } from '../../hooks/queries/useTestimonial'; // <-- adjust path

import { testimonialApi } from '../../api/testimonialApi';
import type { PaginatedResponseDto } from '../../api/testimonialApi';
import type { TestimonialDto, FilterTestimonialDto } from '../../api/testimonialApi';

// ============================================================
// TEST WRAPPER
// ============================================================

const createWrapper = (queryClient?: QueryClient) => {
  const client =
    queryClient ||
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

// ============================================================
// SHARED MOCK DATA
// ============================================================

const mockTestimonials: PaginatedResponseDto<TestimonialDto> = {
  items: [
    {
      _id: '1',
      name: 'John Doe',
      review: 'Great!',
      role: 'Project Manager',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
  },
};

// ============================================================
// useTestimonials (QUERY)
// ============================================================

describe('useTestimonials', () => {
  it('should fetch testimonials successfully', async () => {
    vi.mocked(testimonialApi.getTestimonials).mockResolvedValue(mockTestimonials);

    const { result } = renderHook(() => useTestimonials(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(testimonialApi.getTestimonials).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockTestimonials);
  });

  it('should pass filters to API', async () => {
    const filters: FilterTestimonialDto = { page: 1, limit: 10 };

    vi.mocked(testimonialApi.getTestimonials).mockResolvedValue(mockTestimonials);

    const { result } = renderHook(() => useTestimonials(filters), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(testimonialApi.getTestimonials).toHaveBeenCalledWith(filters);
  });
});
