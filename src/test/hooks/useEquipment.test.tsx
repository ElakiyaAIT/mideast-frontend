// __tests__/hooks/queries/equipmentQueries.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useEquipmentList,
  useEquipmentDetail,
  useFeaturedEquipment,
  useEquipmentSearch,
  useEquipmentCategories,
  useLatestEquipment,
  useRelatedEquipment,
} from '../../hooks/queries/useEquipment';
import {
  equipmentApi,
  equipmentCategoryApi,
  type Equipment,
  type EquipmentListResponse,
  type EquipmentCategoryListResponse,
} from '../../api/equipmentApi';
import React from 'react';

// Mock APIs
vi.mock('../../api/equipmentApi', () => ({
  equipmentApi: {
    getEquipment: vi.fn(),
    getEquipmentById: vi.fn(),
    getFeaturedEquipment: vi.fn(),
    searchEquipment: vi.fn(),
    getLatest: vi.fn(),
    getRelatedByCategory: vi.fn(),
  },
  equipmentCategoryApi: {
    getCategories: vi.fn(),
  },
}));

// Mock data
const mockEquipment: Equipment = {
  _id: 'eq1',
  title: 'Excavator',
  description: '',
  listingType: 'auction',
  categoryId: { _id: '1', name: 'Heavy' },
  images: [],
  status: 'available',
  sellerId: { _id: '', firstName: '', lastName: '', email: '' },
  make: '',
  models: '',
  year: 2015,
  location: { state: '', city: '', address: '', country: '', zipCode: '' },
  isFeatured: true,
  isPublished: true,
  viewCount: 0,
  inquiryCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  fuelType: '',
  transmission: '',
  enginePower: '',
};

const mockEquipmentList: EquipmentListResponse = {
  items: [mockEquipment],
  pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
};

const mockCategoryList: EquipmentCategoryListResponse = {
  items: [
    {
      _id: 'cat1',
      name: 'Heavy Equipment',
      slug: '',
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ],
  pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('equipmentQueries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // useEquipmentList
  it('useEquipmentList returns equipment list', async () => {
    vi.mocked(equipmentApi.getEquipment).mockResolvedValue({
      success: true,
      data: mockEquipmentList,
      message: 'Success',
    });

    const { result } = renderHook(() => useEquipmentList({ category: ['Heavy'] }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockEquipmentList);
  });

  it('useEquipmentList handles error', async () => {
    vi.mocked(equipmentApi.getEquipment).mockResolvedValue({
      success: false,
      data: null as unknown as EquipmentListResponse,
      message: 'Failed to fetch equipment',
    });

    const { result } = renderHook(() => useEquipmentList(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 5000 });
    expect(result.current.error).toEqual(new Error('Failed to fetch equipment'));
  });

  // useEquipmentDetail
  it('useEquipmentDetail returns equipment details', async () => {
    vi.mocked(equipmentApi.getEquipmentById).mockResolvedValue({
      success: true,
      data: mockEquipment,
      message: 'Success',
    });

    const { result } = renderHook(() => useEquipmentDetail('eq1'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockEquipment);
  });

  it('useEquipmentDetail handles missing ID', () => {
    const { result } = renderHook(() => useEquipmentDetail(undefined), {
      wrapper: createWrapper(),
    });
    // The query is disabled, so nothing runs
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
    // When query is disabled, error is null
    expect(result.current.error).toBeNull();
  });

  it('useEquipmentDetail handles API error', async () => {
    vi.mocked(equipmentApi.getEquipmentById).mockResolvedValue({
      success: false,
      data: null as unknown as Equipment,
      message: 'Failed to fetch details',
    });

    const { result } = renderHook(() => useEquipmentDetail('eq1'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('Failed to fetch details'));
  });

  // useFeaturedEquipment
  it('useFeaturedEquipment returns featured equipment', async () => {
    vi.mocked(equipmentApi.getFeaturedEquipment).mockResolvedValue({
      success: true,
      data: [mockEquipment],
      message: 'Success',
    });

    const { result } = renderHook(() => useFeaturedEquipment(1), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([mockEquipment]);
  });

  it('useFeaturedEquipment handles error', async () => {
    vi.mocked(equipmentApi.getFeaturedEquipment).mockResolvedValue({
      success: false,
      data: null as unknown as Equipment[],
      message: 'Failed to fetch featured equipment',
    });

    const { result } = renderHook(() => useFeaturedEquipment(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('Failed to fetch featured equipment'));
  });

  // useEquipmentSearch
  it('useEquipmentSearch returns search results', async () => {
    vi.mocked(equipmentApi.searchEquipment).mockResolvedValue({
      success: true,
      data: [mockEquipment],
      message: 'Success',
    });

    const { result } = renderHook(() => useEquipmentSearch('Excav'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([mockEquipment]);
  });

  it('useEquipmentSearch is disabled for short query', async () => {
    const { result } = renderHook(() => useEquipmentSearch('E'), { wrapper: createWrapper() });
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('useEquipmentSearch handles error', async () => {
    vi.mocked(equipmentApi.searchEquipment).mockResolvedValue({
      success: false,
      data: null as unknown as Equipment[],
      message: 'Search failed',
    });

    const { result } = renderHook(() => useEquipmentSearch('Exc'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('Search failed'));
  });

  // useEquipmentCategories
  it('useEquipmentCategories returns categories', async () => {
    vi.mocked(equipmentCategoryApi.getCategories).mockResolvedValue({
      success: true,
      data: mockCategoryList,
      message: 'Success',
    });

    const { result } = renderHook(() => useEquipmentCategories(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockCategoryList);
  });

  // useLatestEquipment
  it('useLatestEquipment returns latest equipment', async () => {
    vi.mocked(equipmentApi.getLatest).mockResolvedValue({
      success: true,
      data: [mockEquipment],
      message: 'Success',
    });

    const { result } = renderHook(() => useLatestEquipment(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([mockEquipment]);
  });

  // useRelatedEquipment
  it('useRelatedEquipment returns related equipment', async () => {
    vi.mocked(equipmentApi.getRelatedByCategory).mockResolvedValue({
      success: true,
      data: mockEquipmentList,
      message: 'Success',
    });

    const { result } = renderHook(() => useRelatedEquipment({ id: 'cat1' }), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockEquipmentList);
  });
});
