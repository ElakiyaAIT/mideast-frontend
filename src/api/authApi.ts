import axiosInstance from './axiosInstance';
import type {
  LoginRequestDto,
  RegisterRequestDto,
  AuthResponseDto,
  RefreshTokenResponseDto,
  LogoutResponseDto,
  UserProfileDto,
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  GoogleSignInRequestDto,
} from '../dto';
import type { ApiResponse } from '../dto';
import { enableGlobalLoader, disableLoader } from '../utils/apiLoaderInterceptor';

export const authApi = {
  /**
   * Login - Shows GLOBAL loader (blocks UI)
   * Critical authentication operation
   */
  login: async (data: LoginRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/login',
      data,
      enableGlobalLoader('Logging in...'),
    );
    return response.data;
  },

  /**
   * Register - Shows GLOBAL loader
   * Critical account creation operation
   */
  register: async (data: RegisterRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/register',
      { ...data, isActive: true },
      enableGlobalLoader('Creating your account...'),
    );
    return response.data;
  },

  /**
   * Logout - SILENT (no loader)
   * Fast operation, no need to block UI
   */
  logout: async (): Promise<ApiResponse<LogoutResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<LogoutResponseDto>>('/auth/logout', {});
    return response.data;
  },

  /**
   * Refresh Token - ALWAYS SILENT
   * Background operation, should never show loader
   */
  refreshToken: async (): Promise<ApiResponse<RefreshTokenResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<RefreshTokenResponseDto>>(
      '/auth/refresh',
      {},
      disableLoader(),
    );
    return response.data;
  },

  /**
   * Get Current User - SCOPED loader (default)
   * Shows loader but doesn't block entire UI
   */
  getCurrentUser: async (): Promise<ApiResponse<UserProfileDto>> => {
    const response = await axiosInstance.get<ApiResponse<UserProfileDto>>('/auth/profile');
    return response.data;
  },

  /**
   * Forgot Password - Shows GLOBAL loader
   * User expects feedback for email sending
   */
  forgotPassword: async (
    data: ForgotPasswordRequestDto,
  ): Promise<ApiResponse<ForgotPasswordResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<ForgotPasswordResponseDto>>(
      '/auth/forgot-password',
      data,
      enableGlobalLoader('Sending reset link...'),
    );
    return response.data;
  },

  /**
   * Google Sign In - Shows GLOBAL loader
   * Critical authentication flow
   */
  googleSignIn: async (data: GoogleSignInRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/google-signin',
      data,
      enableGlobalLoader('Signing in with Google...'),
    );
    return response.data;
  },

  /**
   * Reset Password - Shows GLOBAL loader
   * Important account security operation
   */
  resetPassword: async (
    data: ResetPasswordRequestDto,
  ): Promise<ApiResponse<ResetPasswordResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<ResetPasswordResponseDto>>(
      '/auth/reset-password',
      data,
      enableGlobalLoader('Resetting password...'),
    );
    return response.data;
  },
};
