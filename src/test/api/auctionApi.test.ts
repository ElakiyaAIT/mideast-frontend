import { describe, it, expect, vi, beforeEach } from 'vitest';
import { auctionApi, type AuctionListResponse } from '../../api/auctionApi';
import type { Auction } from '../../types/home';

// Mock axios instance - use vi.hoisted to avoid hoisting issues
const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: mockGet,
  },
}));

describe('auctionApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getLatestAuction', () => {
    it('should fetch latest auction successfully', async () => {
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

      mockGet.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAuction,
          message: 'Success',
        },
      });

      const result = await auctionApi.getLatestAuction();

      expect(mockGet).toHaveBeenCalledWith('/auctions/latest');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAuction);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(auctionApi.getLatestAuction()).rejects.toThrow('Network error');
    });
  });

  describe('getFilterAuctions', () => {
    it('should fetch filtered auctions with params', async () => {
      const mockResponse: AuctionListResponse = {
        items: [
          {
            _id: 1,
            title: 'Auction 1',
            startDate: '2026-01-01T00:00:00Z',
            status: 'upcoming',
          },
        ],
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockGet.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockResponse,
          message: 'Success',
        },
      });

      const result = await auctionApi.getFilterAuctions({ type: 'upcoming', page: 1 });

      expect(mockGet).toHaveBeenCalledWith('/auctions', {
        params: { type: 'upcoming', page: 1 },
      });
      expect(result.success).toBe(true);
      expect(result.data.items).toHaveLength(1);
    });

    it('should fetch auctions with empty params', async () => {
      const mockResponse: AuctionListResponse = {
        items: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      };

      mockGet.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockResponse,
          message: 'Success',
        },
      });

      const result = await auctionApi.getFilterAuctions({});

      expect(mockGet).toHaveBeenCalledWith('/auctions', {
        params: {},
      });
      expect(result.success).toBe(true);
    });
  });
});
