import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLogin, useCurrentUser } from './useAuth';
import { authApi } from '../../api';
import type { JSX, ReactNode } from 'react';

vi.mock('../../api', () => ({
  authApi: {
    login: vi.fn(),
    getCurrentUser: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: (): ReturnType<typeof vi.fn> => vi.fn(),
}));

type WrapperProps = { children: ReactNode };

const createWrapper = (): ((_props: WrapperProps) => JSX.Element) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: WrapperProps): JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('useAuth hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useCurrentUser', () => {
    it('should fetch current user successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user' as const,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        success: true,
        data: mockUser,
        message: 'Success',
      });

      const { result } = renderHook(() => useCurrentUser(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockUser);
      expect(authApi.getCurrentUser).toHaveBeenCalledOnce();
    });

    it('should handle error when fetching user', async () => {
      type MockUserType = {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: 'user';
        createdAt: string;
        updatedAt: string;
      };

      vi.mocked(authApi.getCurrentUser).mockResolvedValue({
        success: false,
        data: null as unknown as MockUserType,
        message: 'Not authenticated',
      });

      const { result } = renderHook(() => useCurrentUser(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });

  describe('useLogin', () => {
    it('should login successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user' as const,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      vi.mocked(authApi.login).mockResolvedValue({
        success: true,
        data: {
          user: mockUser,
          message: 'Login successful',
        },
        message: 'Success',
      });

      const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: 'test@example.com',
        password: 'password123',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(authApi.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
