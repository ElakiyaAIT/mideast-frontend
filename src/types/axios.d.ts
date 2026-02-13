import 'axios';

/**
 * Extend Axios types to support custom loader configuration
 */
declare module 'axios' {
  export interface LoaderConfig {
    /**
     * Enable automatic loading tracking
     * @default true
     */
    enableLoader?: boolean;

    /**
     * Loader type: 'global' blocks UI, 'scoped' doesn't
     * @default 'scoped'
     */
    loaderType?: 'global' | 'scoped';

    /**
     * Namespace for organizing requests
     * @default 'api'
     */
    namespace?: string;

    /**
     * Optional loading message
     */
    message?: string;
  }

  export interface AxiosRequestConfig {
    loader?: LoaderConfig;
    _loaderId?: string;
  }

  export interface InternalAxiosRequestConfig {
    loader?: LoaderConfig;
    _loaderId?: string;
  }
}
