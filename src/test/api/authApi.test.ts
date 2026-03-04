import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authApi } from '../../api/authApi';
// Mock axios instance
const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));
const { mockPost } = vi.hoisted(() => ({
  mockPost: vi.fn(),
}));
vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: mockGet,
    post: mockPost,
  },
}));

describe('authApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' };
      const mockResponse = {
        user: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          role: 'user',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
        },
        token: 'mock-token',
      };

      mockPost.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Login successful' },
      });

      const result = await authApi.login(loginData);

      expect(mockPost).toHaveBeenCalledWith('/auth/login', loginData, expect.anything());
      expect(result.success).toBe(true);
    });

    it('should handle login error', async () => {
      mockPost.mockRejectedValueOnce(new Error('Invalid credentials'));

      await expect(authApi.login({ email: 'test@test.com', password: 'wrong' })).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      const registerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123',
      };
      const mockResponse = {
        user: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          role: 'user',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
        },
        token: 'mock-token',
      };

      mockPost.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Registration successful' },
      });

      const result = await authApi.register(registerData);

      expect(mockPost).toHaveBeenCalledWith(
        '/auth/register',
        { ...registerData, isActive: true },
        expect.anything(),
      );
      expect(result.success).toBe(true);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      mockPost.mockResolvedValueOnce({
        data: { success: true, data: { message: 'Logged out' }, message: 'Success' },
      });

      const result = await authApi.logout();

      expect(mockPost).toHaveBeenCalledWith('/auth/logout', {});
      expect(result.success).toBe(true);
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch current user successfully', async () => {
      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        role: 'user',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockUser, message: 'Success' },
      });

      const result = await authApi.getCurrentUser();

      expect(mockGet).toHaveBeenCalledWith('/auth/profile');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Unauthorized'));

      await expect(authApi.getCurrentUser()).rejects.toThrow('Unauthorized');
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      const mockResponse = { token: 'new-mock-token' };

      mockPost.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Token refreshed' },
      });

      const result = await authApi.refreshToken();

      expect(mockPost).toHaveBeenCalledWith('/auth/refresh', {}, expect.anything());
      expect(result.success).toBe(true);
    });
  });

  describe('forgotPassword', () => {
    it('should send forgot password request', async () => {
      mockPost.mockResolvedValueOnce({
        data: { success: true, data: { message: 'Reset link sent' }, message: 'Success' },
      });

      const result = await authApi.forgotPassword({ email: 'test@example.com' });

      expect(mockPost).toHaveBeenCalledWith(
        '/auth/forgot-password',
        { email: 'test@example.com' },
        expect.anything(),
      );
      expect(result.success).toBe(true);
    });
  });

  describe('googleSignIn', () => {
    it('should sign in with Google', async () => {
      const mockResponse = {
        user: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          role: 'user',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
        },
        token: 'google-token',
      };

      mockPost.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Success' },
      });

      const result = await authApi.googleSignIn({ idToken: 'google-id-token' });

      expect(mockPost).toHaveBeenCalledWith(
        '/auth/google-signin',
        { idToken: 'google-id-token' },
        expect.anything(),
      );
      expect(result.success).toBe(true);
    });
  });

  describe('resetPassword', () => {
    it('should reset password', async () => {
      const resetData = { token: 'reset-token', newPassword: 'newpassword123' };

      mockPost.mockResolvedValueOnce({
        data: { success: true, data: { message: 'Password reset successful' }, message: 'Success' },
      });

      const result = await authApi.resetPassword(resetData);

      expect(mockPost).toHaveBeenCalledWith('/auth/reset-password', resetData, expect.anything());
      expect(result.success).toBe(true);
    });
  });
});
