import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLatestAuction, useFilteredAuctions } from '../../hooks/queries/useAuction';
import { auctionApi, type AuctionListResponse } from '../../api/auctionApi';
import type { Auction, NewAuction } from '../../types/home';
import React from 'react';

// Mock the API
vi.mock('../../api/auctionApi', () => ({
  auctionApi: {
    getLatestAuction: vi.fn(),
    getFilterAuctions: vi.fn(),
  },
}));

// Mock data
const mockAuction: Auction = {
  _id: '1',
  title: 'Test Auction',
  startDate: '2026-01-01T00:00:00Z',
  date: '2026-01-01',
  time: '10:00 AM',
  location: { _id: 'loc1', city: 'New York', state: 'NY' },
  images: [],
  status: 'upcoming',
};

const mockNewAuction: NewAuction = {
  _id: 1,
  title: 'Test New Auction',
  startDate: '2026-01-01T00:00:00Z',
  status: 'upcoming',
};

const mockAuctionList: AuctionListResponse = {
  items: [mockNewAuction],
  pagination: {
    total: 1,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // Disable cache for tests to ensure clean state
        staleTime: 0,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('auctionQueries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('useLatestAuction returns latest auction', async () => {
    vi.mocked(auctionApi.getLatestAuction).mockResolvedValue({
      success: true,
      data: mockAuction,
      message: 'Success',
    });

    const { result } = renderHook(() => useLatestAuction(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAuction);
    expect(auctionApi.getLatestAuction).toHaveBeenCalledTimes(1);
  });

  it('useLatestAuction handles error', async () => {
    vi.mocked(auctionApi.getLatestAuction).mockResolvedValue({
      success: false,
      message: 'Failed to fetch latest auction',
      data: null as unknown as Auction,
    });

    const { result } = renderHook(() => useLatestAuction(), {
      wrapper: createWrapper(),
    });

    // Need a longer timeout or manual control because of hardcoded retry: 2 in the hook
    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 5000 });

    expect(result.current.error).toEqual(new Error('Failed to fetch latest auction'));
  });

  it('useFilteredAuctions returns filtered auctions', async () => {
    vi.mocked(auctionApi.getFilterAuctions).mockResolvedValue({
      success: true,
      data: mockAuctionList,
      message: 'Success',
    });

    const { result } = renderHook(() => useFilteredAuctions({ type: 'upcoming' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAuctionList);
  });

  it('useFilteredAuctions handles error', async () => {
    vi.mocked(auctionApi.getFilterAuctions).mockResolvedValue({
      success: false,
      message: 'Failed fetching auctions',
      data: null as unknown as AuctionListResponse,
    });

    const { result } = renderHook(() => useFilteredAuctions({ type: 'past' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 5000 });

    expect(result.current.error).toEqual(new Error('Failed fetching auctions'));
  });
});
