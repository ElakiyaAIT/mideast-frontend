import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, type UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';
import { authApi } from '../../api';
import type {
  LoginRequestDto,
  RegisterRequestDto,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  UserDto,
  LogoutResponseDto,
  ForgotPasswordResponseDto,
  ResetPasswordResponseDto,
} from '../../dto';
import { normalizeApiError, getUserFriendlyMessage } from '../../utils/errorHandler';
import { showToast } from '../../utils/toast';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

/**
 * Get current user profile
 */
export const useCurrentUser = (): UseQueryResult<UserDto, Error> => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async (): Promise<UserDto> => {
      const response = await authApi.getCurrentUser();
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch user profile');
      }
      return response.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Login mutation
 */
export const useLogin = (): UseMutationResult<UserDto, Error, LoginRequestDto> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequestDto): Promise<UserDto> => {
      const response = await authApi.login(credentials);
      if (!response.success) {
        throw new Error(response.message ?? 'Login failed');
      }
      return response.data.user;
    },
    onSuccess: (user): void => {
      // Invalidate and refetch user profile
      queryClient.setQueryData(authKeys.profile(), user);
      showToast.success('Login successful');
      void navigate('/');
    },
    onError: (error): void => {
      const normalizedError = normalizeApiError(error);
      showToast.error(normalizedError.message);
    },
  });
};

/**
 * Register mutation
 */
export const useRegister = (): UseMutationResult<UserDto, Error, RegisterRequestDto> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterRequestDto): Promise<UserDto> => {
      const response = await authApi.register(data);
      if (!response.success) {
        throw new Error(response.message ?? 'Registration failed');
      }
      return response.data.user;
    },
    onSuccess: (user): void => {
      queryClient.setQueryData(authKeys.profile(), user);
      showToast.success('Registration successful');
      void navigate('/');
    },
    onError: (error): void => {
      const normalizedError = normalizeApiError(error);
      showToast.error(normalizedError.message);
    },
  });
};

/**
 * Logout mutation
 */
export const useLogout = (): UseMutationResult<LogoutResponseDto, Error, void> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<LogoutResponseDto> => {
      const response = await authApi.logout();
      if (!response.success) {
        throw new Error(response.message ?? 'Logout failed');
      }
      return response.data;
    },
    onSuccess: (): void => {
      // Clear all queries
      queryClient.clear();
      showToast.success('Logged out successfully');
      void navigate('/login');
    },
    onError: (error): void => {
      // Still logout even if API call fails
      queryClient.clear();
      const normalizedError = normalizeApiError(error);
      console.error('Logout error:', normalizedError);
      void navigate('/login');
    },
  });
};

/**
 * Forgot password mutation
 */
export const useForgotPassword = (): UseMutationResult<
  ForgotPasswordResponseDto,
  Error,
  ForgotPasswordRequestDto
> => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequestDto): Promise<ForgotPasswordResponseDto> => {
      const response = await authApi.forgotPassword(data);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to send password reset email');
      }
      return response.data;
    },
    onSuccess: (): void => {
      showToast.success('Password reset email sent');
    },
    onError: (error): void => {
      const normalizedError = normalizeApiError(error);
      const message = getUserFriendlyMessage(normalizedError);
      showToast.error(message);
    },
  });
};

/**
 * Reset password mutation
 */
export const useResetPassword = (): UseMutationResult<
  ResetPasswordResponseDto,
  Error,
  ResetPasswordRequestDto
> => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ResetPasswordRequestDto): Promise<ResetPasswordResponseDto> => {
      const response = await authApi.resetPassword(data);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to reset password');
      }
      return response.data;
    },
    onSuccess: (): void => {
      showToast.success('Password reset successfully');
      void navigate('/login');
    },
    onError: (error): void => {
      const normalizedError = normalizeApiError(error);
      const message = getUserFriendlyMessage(normalizedError);
      showToast.error(message);
    },
  });
};

/**
 * Google Sign In mutation
 */
export const useGoogleSignIn = (): UseMutationResult<UserCredential, Error, void> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<UserCredential> => {
      try {
        // Sign in with Google using Firebase
        const result = await signInWithPopup(auth, googleProvider);
        return result;
      } catch (error: unknown) {
        // Handle Firebase auth errors
        if (error && typeof error === 'object' && 'code' in error) {
          const firebaseError = error as { code: string; message?: string };
          if (firebaseError.code === 'auth/popup-closed-by-user') {
            throw new Error('Sign in cancelled');
          } else if (firebaseError.code === 'auth/popup-blocked') {
            throw new Error('Popup blocked. Please allow popups for this site.');
          } else if (firebaseError.code === 'auth/network-request-failed') {
            throw new Error('Network error. Please check your connection.');
          }
          throw new Error(firebaseError.message ?? 'Google sign in failed');
        }
        throw new Error('Google sign in failed');
      }
    },
    onSuccess: async (credential): Promise<void> => {
      try {
        // Get ID token from Firebase
        const idToken = await credential.user.getIdToken();

        // Send token to backend
        const response = await authApi.googleSignIn({ idToken });

        if (!response.success) {
          throw new Error(response.message ?? 'Google sign in failed');
        }

        // Update user profile in cache
        queryClient.setQueryData(authKeys.profile(), response.data.user);
        showToast.success('Signed in with Google successfully');
        void navigate('/');
      } catch (error) {
        // Sign out from Firebase if backend call fails
        await auth.signOut();
        const normalizedError = normalizeApiError(error);
        showToast.error(normalizedError.message);
        throw error;
      }
    },
    onError: (error): void => {
      const normalizedError = normalizeApiError(error);
      showToast.error(normalizedError.message);
    },
  });
};
