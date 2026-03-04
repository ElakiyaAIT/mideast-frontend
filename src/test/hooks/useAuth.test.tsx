import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as authHooks from '../../hooks/queries/useAuth';
import { authApi } from '../../api';
import { showToast } from '../../utils/toast';
import { signInWithPopup, type UserCredential } from 'firebase/auth';
import type {
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  UserDto,
} from '../../dto';
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
    forgotPassword: vi.fn(), // <-- add this
    resetPassword: vi.fn(), // ✅ ADD THIS
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
vi.mock('../../firebase', () => ({
  auth: {
    signOut: vi.fn(),
  },
  googleProvider: {},
}));
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
    const mockCredential = {
      user: {
        getIdToken: vi.fn().mockResolvedValue('mock-token'),
      },
    } as unknown as UserCredential;

    it('signs in successfully', async () => {
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

    it('handles popup closed by user', async () => {
      vi.mocked(signInWithPopup).mockRejectedValue({
        code: 'auth/popup-closed-by-user',
      });

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(showToast.error).toHaveBeenCalledWith('Sign in cancelled');
    });

    it('handles popup blocked error', async () => {
      vi.mocked(signInWithPopup).mockRejectedValue({
        code: 'auth/popup-blocked',
      });

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(showToast.error).toHaveBeenCalledWith(
        'Popup blocked. Please allow popups for this site.',
      );
    });

    it('handles network error', async () => {
      vi.mocked(signInWithPopup).mockRejectedValue({
        code: 'auth/network-request-failed',
      });

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(showToast.error).toHaveBeenCalledWith('Network error. Please check your connection.');
    });

    it('handles backend failure after firebase success', async () => {
      vi.mocked(signInWithPopup).mockResolvedValue(mockCredential);

      vi.mocked(authApi.googleSignIn).mockResolvedValue({
        success: false,
        message: 'Backend error',
        data: null as any,
      });

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(showToast.error).toHaveBeenCalledWith('Backend error');
    });
    it('handles unknown firebase error code', async () => {
      vi.mocked(signInWithPopup).mockRejectedValue({
        code: 'auth/internal-error',
        message: 'Internal Firebase error',
      });

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(showToast.error).toHaveBeenCalledWith('Internal Firebase error');
    });
    it('handles unexpected non-object error', async () => {
      vi.mocked(signInWithPopup).mockRejectedValue(new Error('Random failure'));

      const { result } = renderHook(() => authHooks.useGoogleSignIn(), {
        wrapper: createWrapper(),
      });

      act(() => result.current.mutate());

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(showToast.error).toHaveBeenCalledWith('Google sign in failed');
    });
  });
});

// ================= useForgotPassword =================
describe('useForgotPassword', () => {
  const requestData: ForgotPasswordRequestDto = { email: 'john@example.com' };
  const mockResponse: ForgotPasswordResponseDto = { message: 'Reset email sent' };

  it('sends forgot password email successfully', async () => {
    vi.mocked(authApi.forgotPassword).mockResolvedValue({
      success: true,
      data: mockResponse,
      message: 'Success',
    });

    const { result } = renderHook(() => authHooks.useForgotPassword(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(requestData));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(authApi.forgotPassword).toHaveBeenCalledWith(requestData);
    expect(showToast.success).toHaveBeenCalledWith('Password reset email sent');
  });

  it('handles error when forgot password fails', async () => {
    vi.mocked(authApi.forgotPassword).mockResolvedValue({
      success: false,
      message: 'Email not found',
      data: null as unknown as ForgotPasswordResponseDto,
    });

    const { result } = renderHook(() => authHooks.useForgotPassword(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(requestData));

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(showToast.error).toHaveBeenCalledWith('Email not found');
  });

  it('handles network or unexpected error', async () => {
    vi.mocked(authApi.forgotPassword).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => authHooks.useForgotPassword(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(requestData));

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(showToast.error).toHaveBeenCalled();
  });
});
// ================= useResetPassword =================
describe('useResetPassword', () => {
  const requestData: ResetPasswordRequestDto = {
    token: 'reset-token',
    newPassword: 'newPassword123',
  };

  const mockResponse: ResetPasswordResponseDto = {
    message: 'Password reset successfully',
  };

  it('resets password successfully', async () => {
    vi.mocked(authApi.resetPassword).mockResolvedValue({
      success: true,
      data: mockResponse,
      message: 'Success',
    });

    const { result } = renderHook(() => authHooks.useResetPassword(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(requestData));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(authApi.resetPassword).toHaveBeenCalledWith(requestData);
    expect(showToast.success).toHaveBeenCalledWith('Password reset successfully');
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('handles API failure', async () => {
    vi.mocked(authApi.resetPassword).mockResolvedValue({
      success: false,
      message: 'Invalid or expired token',
      data: null as unknown as ResetPasswordResponseDto,
    });

    const { result } = renderHook(() => authHooks.useResetPassword(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(requestData));

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(showToast.error).toHaveBeenCalledWith('Invalid or expired token');
  });

  it('handles unexpected/network error', async () => {
    vi.mocked(authApi.resetPassword).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => authHooks.useResetPassword(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(requestData));

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(showToast.error).toHaveBeenCalled();
  });
});
