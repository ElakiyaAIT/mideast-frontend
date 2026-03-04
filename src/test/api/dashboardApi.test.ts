import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dashboardApi } from '../../api/dashboardApi';
// Mock axios instance
const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));
vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: mockGet,
  },
}));

describe('dashboardApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getStats', () => {
    it('should fetch dashboard stats successfully', async () => {
      const mockStats = {
        totalUsers: 100,
        activeUsers: 50,
        totalRevenue: 50000,
        monthlyGrowth: 25,
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockStats, message: 'Success' },
      });

      const result = await dashboardApi.getStats();

      expect(mockGet).toHaveBeenCalledWith('/dashboard/stats');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(dashboardApi.getStats()).rejects.toThrow('Network error');
    });
  });

  describe('getWidgets', () => {
    it('should fetch dashboard widgets successfully', async () => {
      const mockWidgets = [
        {
          id: '1',
          title: 'Total Sales',
          value: 50000,
          change: 10,
          changeType: 'increase',
          icon: 'sales',
        },
        {
          id: '2',
          title: 'Active Users',
          value: 150,
          change: 5,
          changeType: 'increase',
          icon: 'users',
        },
      ];

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockWidgets, message: 'Success' },
      });

      const result = await dashboardApi.getWidgets();

      expect(mockGet).toHaveBeenCalledWith('/dashboard/widgets');
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(dashboardApi.getWidgets()).rejects.toThrow('Network error');
    });
  });
});
