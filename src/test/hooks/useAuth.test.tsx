import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as authHooks from '../../hooks/queries/useAuth';
import { authApi } from '../../api';
import { showToast } from '../../utils/toast';
import { signInWithPopup, type UserCredential } from 'firebase/auth';
import type { LoginRequestDto, RegisterRequestDto, UserDto } from '../../dto';
import React from 'react';

// Mock APIs and utilities
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<object>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../api', () => ({
  authApi: {
    getCurrentUser: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    googleSignIn: vi.fn(),
  },
}));

vi.mock('../../utils/toast', () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual<object>('firebase/auth');
  return {
    ...actual,
    signInWithPopup: vi.fn(),
  };
});

// Helper wrapper for react-query hooks
const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Auth Hooks', () => {
  const mockUser: UserDto = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ================= useCurrentUser =================
  describe('useCurrentUser', () => {
    it('fetches user profile successfully', async () => {
      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        success: true,
        data: mockUser,
        message: 'Profile fetched',
      });

      const { result } = renderHook(() => authHooks.useCurrentUser(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockUser);
      expect(authApi.getCurrentUser).toHaveBeenCalledTimes(1);
    });

    it('handles error when fetch fails', async () => {
      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        success: false,
        message: 'API error',
        data: null as unknown as UserDto,
      });

      const { result } = renderHook(() => authHooks.useCurrentUser(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('API error');
    });
  });

  // ================= useLogin =================
  describe('useLogin', () => {
    const loginData: LoginRequestDto = { email: 'john@example.com', password: '123456' };

    it('logs in successfully', async () => {
      vi.mocked(authApi.login).mockResolvedValue({
        success: true,
        data: { user: mockUser, message: 'Login successful' },
        message: 'Success',
      });

      const { result } = renderHook(() => authHooks.useLogin(), { wrapper: createWrapper() });

      act(() => {
        result.current.mutate(loginData);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(authApi.login).toHaveBeenCalledWith(loginData);
      expect(showToast.success).toHaveBeenCalledWith('Login successful');
      expect(navigateMock).toHaveBeenCalledWith('/');
    });

    it('handles login error', async () => {
      vi.mocked(authApi.login).mockResolvedValue({
        success: false,
        message: 'Login failed',
        data: {
          user: {
            id: '0',
            email: '',
            firstName: '',
            lastName: '',
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          message: 'Login failed',
        },
      });

      const { result } = renderHook(() => authHooks.useLogin(), { wrapper: createWrapper() });

      act(() => {
        result.current.mutate(loginData);
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(showToast.error).toHaveBeenCalledWith('Login failed');
    });
  });

  // ================= useRegister =================
  describe('useRegister', () => {
    const registerData: RegisterRequestDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: '123456',
    };

    it('registers successfully', async () => {
      vi.mocked(authApi.register).mockResolvedValue({
        success: true,
        data: { user: mockUser, message: 'Registration successful' },
        message: 'Success',
      });

      const { result } = renderHook(() => authHooks.useRegister(), { wrapper: createWrapper() });

      act(() => {
        result.current.mutate(registerData);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(showToast.success).toHaveBeenCalledWith('Registration successful');
      expect(navigateMock).toHaveBeenCalledWith('/');
    });

    it('handles registration error', async () => {
      vi.mocked(authApi.register).mockResolvedValue({
        success: false,
        message: 'Registration failed',
        data: {
          user: {
            id: '0',
            email: '',
            firstName: '',
            lastName: '',
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          message: 'Registration failed',
        },
      });

      const { result } = renderHook(() => authHooks.useRegister(), { wrapper: createWrapper() });

      act(() => {
        result.current.mutate(registerData);
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(showToast.error).toHaveBeenCalledWith('Registration failed');
    });
  });

  // ================= useLogout =================
  describe('useLogout', () => {
    it('logs out successfully', async () => {
      vi.mocked(authApi.logout).mockResolvedValue({
        success: true,
        data: { message: 'Logged out' },
        message: 'Success',
      });

      const { result } = renderHook(() => authHooks.useLogout(), { wrapper: createWrapper() });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(showToast.success).toHaveBeenCalledWith('Logged out successfully');
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });

  // ================= useGoogleSignIn =================
  describe('useGoogleSignIn', () => {
    it('signs in with Google successfully', async () => {
      const mockCredential = {
        user: {
          getIdToken: vi.fn().mockResolvedValue('token'),
        },
      } as unknown as UserCredential;

      vi.mocked(signInWithPopup).mockResolvedValue(mockCredential);
      vi.mocked(authApi.googleSignIn).mockResolvedValue({
        success: true,
        data: { user: mockUser, message: 'Success' },
        message: 'Success',
      });

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(showToast.success).toHaveBeenCalledWith('Signed in with Google successfully');
      expect(navigateMock).toHaveBeenCalledWith('/');
    });

    it('handles Google sign in error', async () => {
      vi.mocked(signInWithPopup).mockRejectedValue(new Error('Popup blocked'));

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(showToast.error).toHaveBeenCalled();
    });
  });
});
