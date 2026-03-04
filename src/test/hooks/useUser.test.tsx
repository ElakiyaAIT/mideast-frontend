import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserProfile, useUpdateProfile } from '../../hooks/queries/useUser';
import { userApi } from '../../api';
import { showToast } from '../../utils/toast';
import type { UpdateUserProfileDto, UserProfileDto } from '../../dto';
import React from 'react';

// Mock the API and toast
vi.mock('../../api', () => ({
  userApi: {
    getProfile: vi.fn(),
    updateProfile: vi.fn(),
  },
}));

vi.mock('../../utils/toast', () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Helper to wrap hook in QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUserProfile', () => {
  const mockUser: UserProfileDto = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    email: 'john@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches user profile successfully', async () => {
    vi.mocked(userApi.getProfile).mockResolvedValue({
      success: true,
      data: mockUser,
    });

    const { result } = renderHook(() => useUserProfile(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUser);
    expect(userApi.getProfile).toHaveBeenCalledTimes(1);
  });

  it('throws error when fetch fails', async () => {
    vi.mocked(userApi.getProfile).mockResolvedValue({
      success: false,
      message: 'API error',
      data: {
        id: '',
        firstName: '',
        lastName: '',
        role: 'user',
        email: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    const { result } = renderHook(() => useUserProfile(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('API error');
  });
});

describe('useUpdateProfile', () => {
  const updatedUser: UserProfileDto = {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'user',
    email: 'jane@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const inputData: UpdateUserProfileDto = {
    firstName: 'Jane',
    email: 'jane@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('updates profile successfully', async () => {
    vi.mocked(userApi.updateProfile).mockResolvedValue({
      success: true,
      data: { user: updatedUser, message: 'Profile updated' },
    });

    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(inputData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(updatedUser);
    expect(userApi.updateProfile).toHaveBeenCalledWith(inputData);
    expect(showToast.success).toHaveBeenCalledWith('Profile updated successfully');
  });

  it('handles error during update', async () => {
    vi.mocked(userApi.updateProfile).mockResolvedValue({
      success: false,
      message: 'Update failed',
      data: {
        user: {
          id: '0',
          email: '',
          firstName: '',
          lastName: '',
          role: 'user', // or the appropriate UserRole
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        message: 'Update failed',
      },
    });

    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(inputData);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(showToast.error).toHaveBeenCalledWith('Update failed');
  });
});
