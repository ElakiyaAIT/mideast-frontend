import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { userApi } from '../../api';
import type { UpdateUserProfileDto, UserProfileDto } from '../../dto';
import { normalizeApiError, getUserFriendlyMessage } from '../../utils/errorHandler';
import { showToast } from '../../utils/toast';
import { authKeys } from './useAuth';

// Query keys
export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};

/**
 * Get user profile
 */
export const useUserProfile = (): UseQueryResult<UserProfileDto, Error> => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async (): Promise<UserProfileDto> => {
      const response = await userApi.getProfile();
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch profile');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Update user profile mutation
 */
export const useUpdateProfile = (): UseMutationResult<
  UserProfileDto,
  Error,
  UpdateUserProfileDto
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserProfileDto): Promise<UserProfileDto> => {
      const response = await userApi.updateProfile(data);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to update profile');
      }
      return response.data.user;
    },
    onSuccess: (user): void => {
      // Update both user and auth profile queries
      queryClient.setQueryData(userKeys.profile(), user);
      queryClient.setQueryData(authKeys.profile(), user);
      showToast.success('Profile updated successfully');
    },
    onError: (error): void => {
      const normalizedError = normalizeApiError(error);
      const message = getUserFriendlyMessage(normalizedError);
      showToast.error(message);
    },
  });
};
