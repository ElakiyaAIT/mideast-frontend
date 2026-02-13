import axiosInstance from './axiosInstance';
import type { UserProfileDto, UpdateUserProfileDto, UpdateUserProfileResponseDto } from '../dto';
import type { ApiResponse } from '../dto';
import { enableGlobalLoader } from '../utils/apiLoaderInterceptor';

export const userApi = {
  /**
   * Get Profile - SCOPED loader (default)
   * Uses default scoped loader
   */
  getProfile: async (): Promise<ApiResponse<UserProfileDto>> => {
    const response = await axiosInstance.get<ApiResponse<UserProfileDto>>('/auth/profile');
    return response.data;
  },

  /**
   * Update Profile - Shows GLOBAL loader
   * Important user action that needs clear feedback
   */
  updateProfile: async (
    data: UpdateUserProfileDto,
  ): Promise<ApiResponse<UpdateUserProfileResponseDto>> => {
    const response = await axiosInstance.patch<ApiResponse<UpdateUserProfileResponseDto>>(
      '/auth/profile',
      data,
      enableGlobalLoader('Updating profile...'),
    );
    return response.data;
  },
};
