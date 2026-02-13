import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, LoaderConfig } from 'axios';
import type { AppDispatch } from '../store';
import { startRequest, endRequest } from '../store/loaderSlice';

/**
 * Optional: Axios Interceptor for Automatic Loading Management
 *
 * This interceptor automatically tracks API requests and manages loading states.
 *
 * Features:
 * - Automatic request tracking
 * - Namespace-based organization
 * - Opt-out via config
 * - Global or scoped loading
 *
 * Usage:
 * import { setupApiLoaderInterceptor } from '@/utils/apiLoaderInterceptor';
 * import axiosInstance from '@/api/axiosInstance';
 * import { store } from '@/store';
 *
 * setupApiLoaderInterceptor(axiosInstance, store.dispatch);
 */

/**
 * Setup automatic loading interceptor for Axios
 *
 * @example
 * // In your main.tsx or app initialization
 * import axiosInstance from './api/axiosInstance';
 * import { store } from './store';
 * import { setupApiLoaderInterceptor } from './utils/apiLoaderInterceptor';
 *
 * setupApiLoaderInterceptor(axiosInstance, store.dispatch);
 */
export const setupApiLoaderInterceptor = (
  axiosInstance: AxiosInstance,
  dispatch: AppDispatch,
): void => {
  // Request interceptor - start tracking
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Check if loader is enabled for this request
      const loaderConfig = config.loader ?? { enableLoader: true };

      if (loaderConfig.enableLoader !== false) {
        // Generate unique request ID
        const requestId = `${config.method}-${config.url}-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // Store request ID in config for response interceptor
        config._loaderId = requestId;

        // Start tracking request
        dispatch(
          startRequest({
            id: requestId,
            namespace: loaderConfig.namespace ?? deriveNamespace(config),
            message: loaderConfig.message,
            type: loaderConfig.loaderType ?? 'scoped',
          }),
        );
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor - stop tracking
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const config = response.config as InternalAxiosRequestConfig;
      if (config._loaderId) {
        dispatch(endRequest(config._loaderId));
      }
      return response;
    },
    (error) => {
      const config = error.config as InternalAxiosRequestConfig;
      if (config?._loaderId) {
        dispatch(endRequest(config._loaderId));
      }
      return Promise.reject(error);
    },
  );
};

/**
 * Derive namespace from request URL
 * Examples:
 * - /api/auth/login → 'auth'
 * - /api/users/123 → 'users'
 * - /api/dashboard/stats → 'dashboard'
 */
const deriveNamespace = (config: InternalAxiosRequestConfig): string => {
  const url = config.url ?? '';
  const parts = url.split('/').filter(Boolean);

  // Try to extract meaningful namespace from URL
  // Remove 'api' prefix if present
  const filteredParts = parts.filter((part) => part !== 'api');

  // Return first meaningful part, or 'api' as fallback
  return filteredParts[0] ?? 'api';
};

/**
 * Helper to disable loader for specific request
 *
 * @example
 * import { disableLoader } from '@/utils/apiLoaderInterceptor';
 *
 * const config = disableLoader();
 * await axios.get('/api/data', config);
 */
export const disableLoader = (): { loader: LoaderConfig } => ({
  loader: {
    enableLoader: false,
  },
});

/**
 * Helper to enable global loader for specific request
 *
 * @example
 * import { enableGlobalLoader } from '@/utils/apiLoaderInterceptor';
 *
 * await axios.post('/api/auth/login', data, enableGlobalLoader('Logging in...'));
 */
export const enableGlobalLoader = (
  message?: string,
  namespace?: string,
): { loader: LoaderConfig } => ({
  loader: {
    enableLoader: true,
    loaderType: 'global',
    message,
    namespace,
  },
});

/**
 * Helper to configure loader for specific request
 *
 * @example
 * import { withLoader } from '@/utils/apiLoaderInterceptor';
 *
 * await axios.get('/api/data', withLoader({
 *   namespace: 'dashboard',
 *   message: 'Loading dashboard...',
 *   loaderType: 'scoped',
 * }));
 */
export const withLoader = (config: LoaderConfig): { loader: LoaderConfig } => ({
  loader: config,
});
