import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Enhanced Loader State Management
 *
 * Features:
 * - Multiple concurrent request tracking
 * - Request-specific loaders with namespaces
 * - Global vs scoped loaders
 * - Minimum display time support
 * - Request metadata tracking
 */

interface LoadingRequest {
  id: string;
  message?: string;
  startTime: number;
  namespace?: string; // e.g., 'page', 'auth', 'dashboard'
  type: 'global' | 'scoped'; // global blocks UI, scoped doesn't
}

interface LoaderState {
  // Global loading state (blocks entire UI)
  isGlobalLoading: boolean;
  globalMessage: string | null;

  // Active requests tracking
  activeRequests: Record<string, LoadingRequest>;

  // Request count by namespace
  requestCountByNamespace: Record<string, number>;

  // Scoped loaders (for specific features/components)
  scopedLoaders: Record<string, boolean>;
}

const initialState: LoaderState = {
  isGlobalLoading: false,
  globalMessage: null,
  activeRequests: {},
  requestCountByNamespace: {},
  scopedLoaders: {},
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    /**
     * Start a global loading operation
     * Use for: Critical page-level operations, auth flows
     */
    showGlobalLoader: (state, action: PayloadAction<string | undefined>) => {
      state.isGlobalLoading = true;
      state.globalMessage = action.payload ?? null;
    },

    /**
     * Stop global loading
     */
    hideGlobalLoader: (state) => {
      state.isGlobalLoading = false;
      state.globalMessage = null;
    },

    /**
     * Start tracking a request
     * @param action.payload.id - Unique request ID
     * @param action.payload.namespace - Optional namespace (e.g., 'auth', 'dashboard')
     * @param action.payload.message - Optional loading message
     * @param action.payload.type - 'global' (blocks UI) or 'scoped' (doesn't block)
     */
    startRequest: (
      state,
      action: PayloadAction<{
        id: string;
        namespace?: string;
        message?: string;
        type?: 'global' | 'scoped';
      }>,
    ) => {
      const { id, namespace, message, type = 'scoped' } = action.payload;

      // Add to active requests
      state.activeRequests[id] = {
        id,
        message,
        namespace,
        type,
        startTime: Date.now(),
      };

      // Update namespace count
      if (namespace) {
        state.requestCountByNamespace[namespace] =
          (state.requestCountByNamespace[namespace] ?? 0) + 1;
      }

      // If global type, show global loader
      if (type === 'global') {
        state.isGlobalLoading = true;
        if (message) {
          state.globalMessage = message;
        }
      }
    },

    /**
     * Stop tracking a request
     */
    endRequest: (state, action: PayloadAction<string>) => {
      const requestId = action.payload;
      const request = state.activeRequests[requestId];

      if (request) {
        // Update namespace count
        if (request.namespace) {
          const count = state.requestCountByNamespace[request.namespace] ?? 0;
          if (count > 0) {
            state.requestCountByNamespace[request.namespace] = count - 1;
          }
        }

        // Remove from active requests
        delete state.activeRequests[requestId];

        // If this was a global request and no other global requests exist, hide global loader
        if (request.type === 'global') {
          const hasOtherGlobalRequests = Object.values(state.activeRequests).some(
            (r) => r.type === 'global',
          );
          if (!hasOtherGlobalRequests) {
            state.isGlobalLoading = false;
            state.globalMessage = null;
          }
        }
      }
    },

    /**
     * Set a scoped loader state
     * Use for: Component-specific loaders that don't block the entire UI
     */
    setScopedLoader: (state, action: PayloadAction<{ key: string; isLoading: boolean }>) => {
      const { key, isLoading } = action.payload;
      if (isLoading) {
        state.scopedLoaders[key] = true;
      } else {
        delete state.scopedLoaders[key];
      }
    },

    /**
     * Clear all loaders (emergency reset)
     */
    clearAllLoaders: (state) => {
      state.isGlobalLoading = false;
      state.globalMessage = null;
      state.activeRequests = {};
      state.requestCountByNamespace = {};
      state.scopedLoaders = {};
    },
  },
});

export const {
  showGlobalLoader,
  hideGlobalLoader,
  startRequest,
  endRequest,
  setScopedLoader,
  clearAllLoaders,
} = loaderSlice.actions;

export default loaderSlice.reducer;

// Selectors
export const selectIsGlobalLoading = (state: { loader: LoaderState }): boolean =>
  state.loader.isGlobalLoading;

export const selectGlobalMessage = (state: { loader: LoaderState }): string | null =>
  state.loader.globalMessage;

export const selectActiveRequestCount = (state: { loader: LoaderState }): number =>
  Object.keys(state.loader.activeRequests).length;

export const selectNamespaceRequestCount =
  (namespace: string) =>
  (state: { loader: LoaderState }): number =>
    state.loader.requestCountByNamespace[namespace] ?? 0;

export const selectIsScopedLoading =
  (key: string) =>
  (state: { loader: LoaderState }): boolean =>
    state.loader.scopedLoaders[key] ?? false;
