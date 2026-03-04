// tests/apiLoaderInterceptor.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  setupApiLoaderInterceptor,
  disableLoader,
  enableGlobalLoader,
  withLoader,
} from '../../utils/apiLoaderInterceptor';
import { startRequest, endRequest } from '../../store/loaderSlice';
import type { AppDispatch } from '../../store';

describe('apiLoaderInterceptor', () => {
  let axiosMock: AxiosInstance;
  let dispatchMock: AppDispatch;

  beforeEach(() => {
    // Mock Axios instance with interceptors array
    axiosMock = {
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    } as unknown as AxiosInstance;

    dispatchMock = vi.fn() as AppDispatch;
  });

  it('should add request and response interceptors', () => {
    setupApiLoaderInterceptor(axiosMock, dispatchMock);

    expect(axiosMock.interceptors.request.use).toHaveBeenCalled();
    expect(axiosMock.interceptors.response.use).toHaveBeenCalled();
  });

  it('should start loader on request and end loader on response', async () => {
    setupApiLoaderInterceptor(axiosMock, dispatchMock);

    const requestInterceptor = vi.mocked(axiosMock.interceptors.request.use).mock.calls[0][0];
    const responseInterceptor = vi.mocked(axiosMock.interceptors.response.use).mock.calls[0][0];
    const errorInterceptor = vi.mocked(axiosMock.interceptors.response.use).mock.calls[0][1];

    const config: InternalAxiosRequestConfig = {
      url: '/api/users',
      method: 'get',
      headers: {} as Record<string, string>, // Axios headers are complex to mock perfectly, keeping minimal any here is acceptable but let's see if we can improve
    } as InternalAxiosRequestConfig;

    // Simulate request
    if (requestInterceptor) {
      const newConfig = await requestInterceptor(config);
      expect(newConfig._loaderId).toBeDefined();
      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({ type: startRequest.type }),
      );

      // Simulate successful response
      if (responseInterceptor) {
        const response: AxiosResponse = {
          config: newConfig,
          data: {},
          status: 200,
          statusText: 'OK',
          headers: {},
        };
        const res = await responseInterceptor(response);
        expect(res).toBe(response);
        expect(dispatchMock).toHaveBeenCalledWith(endRequest(newConfig._loaderId!));
      }

      // Simulate error response
      const error = { config: newConfig, response: undefined };
      if (errorInterceptor) {
        await expect(errorInterceptor(error)).rejects.toBe(error);
        expect(dispatchMock).toHaveBeenCalledWith(endRequest(newConfig._loaderId!));
      }
    }
  });

  it('should respect disableLoader helper', () => {
    const config = disableLoader();
    expect(config.loader.enableLoader).toBe(false);
  });

  it('should configure global loader with message and namespace', () => {
    const config = enableGlobalLoader('Loading...', 'dashboard');
    expect(config.loader.enableLoader).toBe(true);
    expect(config.loader.loaderType).toBe('global');
    expect(config.loader.message).toBe('Loading...');
    expect(config.loader.namespace).toBe('dashboard');
  });

  it('should configure scoped loader using withLoader', () => {
    const config = withLoader({
      message: 'Fetching data',
      namespace: 'users',
      loaderType: 'scoped',
    });
    expect(config.loader.message).toBe('Fetching data');
    expect(config.loader.namespace).toBe('users');
    expect(config.loader.loaderType).toBe('scoped');
  });
});
