import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userApi } from '../../api/userApi';

// Mock axios instance
const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));
const { mockPatch } = vi.hoisted(() => ({
  mockPatch: vi.fn(),
}));
vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: mockGet,
    patch: mockPatch,
  },
}));

describe('userApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should fetch user profile successfully', async () => {
      const mockProfile = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockProfile, message: 'Success' },
      });

      const result = await userApi.getProfile();

      expect(mockGet).toHaveBeenCalledWith('/auth/profile');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProfile);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(userApi.getProfile()).rejects.toThrow('Network error');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      const updateData = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
      };

      const mockResponse = {
        user: {
          id: '1',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          role: 'user',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z',
        },
        message: 'Profile updated successfully',
      };

      mockPatch.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Success' },
      });

      const result = await userApi.updateProfile(updateData);

      expect(mockPatch).toHaveBeenCalledWith('/auth/profile', updateData, expect.anything());
      expect(result.success).toBe(true);
    });

    it('should handle update error', async () => {
      mockPatch.mockRejectedValueOnce(new Error('Update failed'));

      await expect(userApi.updateProfile({ firstName: 'Jane' })).rejects.toThrow('Update failed');
    });
  });
});
