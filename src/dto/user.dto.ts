import type { UserRole } from '../types';

export interface UserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UpdateUserProfileResponseDto {
  user: UserProfileDto;
  message: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
