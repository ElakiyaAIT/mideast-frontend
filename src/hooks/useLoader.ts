import { useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  showGlobalLoader,
  hideGlobalLoader,
  startRequest,
  endRequest,
  setScopedLoader,
  selectIsGlobalLoading,
  selectIsScopedLoading,
  selectNamespaceRequestCount,
} from '../store/loaderSlice';

/**
 * Hook for managing global loader state
 *
 * @example
 * const { isLoading, show, hide } = useGlobalLoader();
 *
 * const handleSubmit = async () => {
 *   show('Submitting form...');
 *   await api.submit();
 *   hide();
 * };
 */
export const useGlobalLoader = (): {
  isLoading: boolean;
  show: (message?: string) => void;
  hide: () => void;
} => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsGlobalLoading);

  const show = useCallback(
    (message?: string) => {
      dispatch(showGlobalLoader(message));
    },
    [dispatch],
  );

  const hide = useCallback(() => {
    dispatch(hideGlobalLoader());
  }, [dispatch]);

  return { isLoading, show, hide };
};

/**
 * Hook for managing scoped loader state with automatic cleanup
 *
 * Features:
 * - Component-specific loading state
 * - Automatic cleanup on unmount
 * - Minimum display time support
 *
 * @example
 * const { isLoading, startLoading, stopLoading } = useScopedLoader('user-profile');
 *
 * const loadProfile = async () => {
 *   startLoading();
 *   await fetchUserProfile();
 *   stopLoading();
 * };
 */
export const useScopedLoader = (
  key: string,
  options?: {
    minDisplayTime?: number; // Minimum time to show loader (ms)
  },
): {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
} => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsScopedLoading(key));
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const minDisplayTime = options?.minDisplayTime ?? 300; // Default 300ms

  const startLoading = useCallback(() => {
    startTimeRef.current = Date.now();
    dispatch(setScopedLoader({ key, isLoading: true }));
  }, [dispatch, key]);

  const stopLoading = useCallback(() => {
    if (!startTimeRef.current) {
      dispatch(setScopedLoader({ key, isLoading: false }));
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, minDisplayTime - elapsed);

    if (remaining > 0) {
      // Delay hiding to meet minimum display time
      timeoutRef.current = setTimeout(() => {
        dispatch(setScopedLoader({ key, isLoading: false }));
        startTimeRef.current = null;
      }, remaining);
    } else {
      dispatch(setScopedLoader({ key, isLoading: false }));
      startTimeRef.current = null;
    }
  }, [dispatch, key, minDisplayTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      dispatch(setScopedLoader({ key, isLoading: false }));
    };
  }, [dispatch, key]);

  return { isLoading, startLoading, stopLoading };
};

/**
 * Hook for tracking API requests with namespaces
 *
 * Features:
 * - Automatic request ID generation
 * - Namespace-based request counting
 * - Type-safe request tracking
 *
 * @example
 * const { startRequest, endRequest, requestCount } = useApiLoader('dashboard');
 *
 * const fetchData = async () => {
 *   const requestId = startRequest({ message: 'Loading dashboard...' });
 *   try {
 *     await api.getDashboard();
 *   } finally {
 *     endRequest(requestId);
 *   }
 * };
 */
export const useApiLoader = (
  namespace: string,
): {
  startRequest: (options?: { message?: string; type?: 'global' | 'scoped' }) => string;
  endRequest: (requestId: string) => void;
  requestCount: number;
  isLoading: boolean;
} => {
  const dispatch = useAppDispatch();
  const requestCount = useAppSelector(selectNamespaceRequestCount(namespace));
  const isLoading = requestCount > 0;

  const startRequestFn = useCallback(
    (options?: { message?: string; type?: 'global' | 'scoped' }): string => {
      const requestId = `${namespace}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      dispatch(
        startRequest({
          id: requestId,
          namespace,
          message: options?.message,
          type: options?.type,
        }),
      );
      return requestId;
    },
    [dispatch, namespace],
  );

  const endRequestFn = useCallback(
    (requestId: string) => {
      dispatch(endRequest(requestId));
    },
    [dispatch],
  );

  return {
    startRequest: startRequestFn,
    endRequest: endRequestFn,
    requestCount,
    isLoading,
  };
};

/**
 * Hook for wrapping async operations with loading state
 *
 * Features:
 * - Automatic loading state management
 * - Error handling
 * - Minimum display time
 * - Debouncing for fast operations
 *
 * @example
 * const { execute, isLoading } = useAsyncLoader();
 *
 * const handleSubmit = () => {
 *   execute(async () => {
 *     await api.submit(data);
 *   });
 * };
 */
export const useAsyncLoader = <T = void>(options?: {
  minDisplayTime?: number;
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
  debounceTime?: number;
}): {
  execute: (asyncFn: () => Promise<T>) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
} => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const minDisplayTime = options?.minDisplayTime ?? 300;
  const debounceTime = options?.debounceTime ?? 0;

  const execute = useCallback(
    async (asyncFn: () => Promise<T>) => {
      // Clear any pending debounce
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Debounce if configured
      if (debounceTime > 0) {
        return new Promise<void>((resolve) => {
          debounceTimeoutRef.current = setTimeout(() => {
            void executeImmediate(asyncFn).then(resolve);
          }, debounceTime);
        });
      }

      return executeImmediate(asyncFn);
    },
    [debounceTime, minDisplayTime, options],
  );

  const executeImmediate = async (asyncFn: () => Promise<T>): Promise<void> => {
    startTimeRef.current = Date.now();
    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      options?.onSuccess?.(result);

      // Ensure minimum display time
      const elapsed = Date.now() - (startTimeRef.current ?? 0);
      const remaining = Math.max(0, minDisplayTime - elapsed);

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
    } finally {
      setIsLoading(false);
      startTimeRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return { execute, isLoading, error };
};

// Import React for useState
import React, { useEffect } from 'react';
