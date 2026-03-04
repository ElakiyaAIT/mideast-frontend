import { describe, it, expect } from 'vitest';
import reducer, {
  showGlobalLoader,
  hideGlobalLoader,
  startRequest,
  endRequest,
  setScopedLoader,
  clearAllLoaders,
  selectIsGlobalLoading,
  selectGlobalMessage,
  selectActiveRequestCount,
  selectNamespaceRequestCount,
  selectIsScopedLoading,
} from '../../store/loaderSlice';
describe('loaderSlice', () => {
  const initialState = {
    isGlobalLoading: false,
    globalMessage: null,
    activeRequests: {},
    requestCountByNamespace: {},
    scopedLoaders: {},
  };
  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
    it('should handle showGlobalLoader', () => {
      const state = reducer(initialState, showGlobalLoader('Loading...'));
      expect(state.isGlobalLoading).toBe(true);
      expect(state.globalMessage).toBe('Loading...');
    });
    it('should handle showGlobalLoader without message', () => {
      const state = reducer(initialState, showGlobalLoader());
      expect(state.isGlobalLoading).toBe(true);
      expect(state.globalMessage).toBeNull();
    });
    it('should handle hideGlobalLoader', () => {
      const loadingState = { ...initialState, isGlobalLoading: true, globalMessage: 'Loading...' };
      const state = reducer(loadingState, hideGlobalLoader());
      expect(state.isGlobalLoading).toBe(false);
      expect(state.globalMessage).toBeNull();
    });
    it('should handle startRequest (scoped)', () => {
      const state = reducer(
        initialState,
        startRequest({ id: 'req1', namespace: 'auth', message: 'Authenticating...' }),
      );
      expect(state.activeRequests['req1']).toBeDefined();
      expect(state.activeRequests['req1'].id).toBe('req1');
      expect(state.activeRequests['req1'].namespace).toBe('auth');
      expect(state.activeRequests['req1'].type).toBe('scoped');
      expect(state.requestCountByNamespace['auth']).toBe(1);
      expect(state.isGlobalLoading).toBe(false);
    });
    it('should handle startRequest (global)', () => {
      const state = reducer(
        initialState,
        startRequest({ id: 'req2', type: 'global', message: 'Wait...' }),
      );
      expect(state.activeRequests['req2'].type).toBe('global');
      expect(state.isGlobalLoading).toBe(true);
      expect(state.globalMessage).toBe('Wait...');
    });
    it('should handle endRequest', () => {
      const prevState = reducer(initialState, startRequest({ id: 'req1', namespace: 'auth' }));
      const state = reducer(prevState, endRequest('req1'));
      expect(state.activeRequests['req1']).toBeUndefined();
      expect(state.requestCountByNamespace['auth']).toBe(0);
    });
    it('should toggle global loader off when last global request ends', () => {
      let state = reducer(initialState, startRequest({ id: 'g1', type: 'global' }));
      state = reducer(state, startRequest({ id: 'g2', type: 'global' }));
      expect(state.isGlobalLoading).toBe(true);
      state = reducer(state, endRequest('g1'));
      expect(state.isGlobalLoading).toBe(true);
      state = reducer(state, endRequest('g2'));
      expect(state.isGlobalLoading).toBe(false);
    });
    it('should handle setScopedLoader', () => {
      let state = reducer(initialState, setScopedLoader({ key: 'button', isLoading: true }));
      expect(state.scopedLoaders['button']).toBe(true);
      state = reducer(state, setScopedLoader({ key: 'button', isLoading: false }));
      expect(state.scopedLoaders['button']).toBeUndefined();
    });
    it('should handle clearAllLoaders', () => {
      const dirtyState = {
        isGlobalLoading: true,
        globalMessage: 'Err',
        activeRequests: { '1': { id: '1', startTime: 0, type: 'global' as const } },
        requestCountByNamespace: { auth: 1 },
        scopedLoaders: { test: true },
      };
      const state = reducer(dirtyState, clearAllLoaders());
      expect(state).toEqual(initialState);
    });
  });
  describe('selectors', () => {
    const rootState = {
      loader: {
        isGlobalLoading: true,
        globalMessage: 'Select Me',
        activeRequests: { r1: { id: 'r1', startTime: 0, type: 'scoped' as const } },
        requestCountByNamespace: { api: 5 },
        scopedLoaders: { comp: true },
      },
    };
    it('selectIsGlobalLoading should return global loading state', () => {
      expect(selectIsGlobalLoading(rootState)).toBe(true);
    });
    it('selectGlobalMessage should return global message', () => {
      expect(selectGlobalMessage(rootState)).toBe('Select Me');
    });
    it('selectActiveRequestCount should return count of active requests', () => {
      expect(selectActiveRequestCount(rootState)).toBe(1);
    });
    it('selectNamespaceRequestCount should return count for specific namespace', () => {
      expect(selectNamespaceRequestCount('api')(rootState)).toBe(5);
      expect(selectNamespaceRequestCount('missing')(rootState)).toBe(0);
    });
    it('selectIsScopedLoading should return state for specific scope', () => {
      expect(selectIsScopedLoading('comp')(rootState)).toBe(true);
      expect(selectIsScopedLoading('other')(rootState)).toBe(false);
    });
  });
});
