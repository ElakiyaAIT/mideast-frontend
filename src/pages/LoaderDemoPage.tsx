import { useState, type JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonImage,
  SectionLoader,
  InlineSpinner,
} from '../components';
import { useGlobalLoader, useScopedLoader, useApiLoader, useAsyncLoader } from '../hooks/useLoader';

/**
 * Loader Demo Page
 *
 * This page demonstrates all loading states and components in action.
 * Use this as a reference and for testing different loader scenarios.
 *
 * To access: Add route in your router configuration
 */

const LoaderDemoPage = (): JSX.Element => {
  const [showSkeletons, setShowSkeletons] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Loading System Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test all loader types and states in one place
          </p>
        </div>

        {/* Global Loader Demo */}
        <GlobalLoaderDemo />

        {/* Skeleton Loaders Demo */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skeleton Loaders</h2>
            <Button onClick={() => setShowSkeletons(!showSkeletons)} size="sm">
              {showSkeletons ? 'Hide' : 'Show'} Skeletons
            </Button>
          </div>

          {showSkeletons ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Product {i}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    This is the actual content that appears after loading completes.
                  </p>
                  <Button size="sm">View Details</Button>
                </div>
              ))}
            </div>
          )}

          {/* Individual Skeleton Variants */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Text Skeleton
              </h3>
              <SkeletonText lines={3} />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Avatar Skeleton
              </h3>
              <SkeletonAvatar size="64px" />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Image Skeleton
              </h3>
              <SkeletonImage height="100px" />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Custom Skeleton
              </h3>
              <div className="space-y-2">
                <SkeletonText lines={1} />
                <SkeletonText lines={1} />
                <SkeletonText lines={1} />
              </div>
            </div>
          </div>
        </section>

        {/* Section Loader Demo */}
        <SectionLoaderDemo />

        {/* Button Loading States */}
        <ButtonLoadingDemo />

        {/* Inline Spinner Demo */}
        <InlineSpinnerDemo />

        {/* React Query Integration Demo */}
        <ReactQueryDemo />

        {/* Scoped Loader Demo */}
        <ScopedLoaderDemo />

        {/* API Loader Hook Demo */}
        <ApiLoaderDemo />

        {/* Async Loader Hook Demo */}
        <AsyncLoaderDemo />
      </div>
    </div>
  );
};

// Global Loader Demo Component
const GlobalLoaderDemo = (): JSX.Element => {
  const { show, hide, isLoading } = useGlobalLoader();

  const handleShowGlobal = (): void => {
    show('Processing...');
    setTimeout(() => {
      hide();
    }, 3000);
  };

  return (
    <section className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Global Loader</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Full-page overlay loader for critical operations (auth, app initialization)
      </p>
      <Button onClick={handleShowGlobal} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Show Global Loader (3s)'}
      </Button>
    </section>
  );
};

// Section Loader Demo Component
const SectionLoaderDemo = (): JSX.Element => {
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [replaceLoading, setReplaceLoading] = useState(false);

  const triggerOverlay = (): void => {
    setOverlayLoading(true);
    setTimeout(() => setOverlayLoading(false), 2000);
  };

  const triggerReplace = (): void => {
    setReplaceLoading(true);
    setTimeout(() => setReplaceLoading(false), 2000);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Section Loaders</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Overlay Mode */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Overlay Mode</h3>
          <SectionLoader isLoading={overlayLoading} overlay={true} message="Refreshing...">
            <div className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Dashboard Stats</h4>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                This content is dimmed during loading, and a loader appears on top.
              </p>
              <Button onClick={triggerOverlay} size="sm" disabled={overlayLoading}>
                Refresh (2s)
              </Button>
            </div>
          </SectionLoader>
        </div>

        {/* Replace Mode */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Replace Mode</h3>
          <div className="glass-light rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <Button onClick={triggerReplace} size="sm" disabled={replaceLoading}>
                Load Data (2s)
              </Button>
            </div>
            <SectionLoader
              isLoading={replaceLoading}
              overlay={false}
              message="Loading data..."
              minHeight="200px"
            >
              <div className="p-6">
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Data Content</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  This content is completely replaced by the loader.
                </p>
              </div>
            </SectionLoader>
          </div>
        </div>
      </div>
    </section>
  );
};

// Button Loading Demo
const ButtonLoadingDemo = (): JSX.Element => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleClick = (key: string): void => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <section className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Button Loading States
      </h2>
      <div className="flex flex-wrap gap-4">
        <Button
          variant="primary"
          onClick={() => handleClick('primary')}
          isLoading={loading.primary}
        >
          Primary Button
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleClick('secondary')}
          isLoading={loading.secondary}
        >
          Secondary Button
        </Button>
        <Button
          variant="outline"
          onClick={() => handleClick('outline')}
          isLoading={loading.outline}
        >
          Outline Button
        </Button>
        <Button variant="ghost" onClick={() => handleClick('ghost')} isLoading={loading.ghost}>
          Ghost Button
        </Button>
      </div>
    </section>
  );
};

// Inline Spinner Demo
const InlineSpinnerDemo = (): JSX.Element => {
  return (
    <section className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Inline Spinners</h2>

      <div className="space-y-6">
        {/* Sizes */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Sizes</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <InlineSpinner size="xs" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Extra Small</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineSpinner size="sm" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Small</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineSpinner size="md" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineSpinner size="lg" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Large</span>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Variants</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <InlineSpinner variant="primary" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineSpinner variant="secondary" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Secondary</span>
            </div>
            <div className="flex items-center gap-2 rounded bg-primary-500 px-3 py-1">
              <InlineSpinner variant="white" />
              <span className="text-sm text-white">White</span>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Use Cases</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <InlineSpinner size="sm" />
              <span>Loading search results...</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span>Saving draft</span>
              <InlineSpinner size="xs" />
            </div>
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
              <span>Delete</span>
              <InlineSpinner size="xs" variant="current" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// React Query Demo
const ReactQueryDemo = (): JSX.Element => {
  // Simulate API call
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['demo-data'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        users: 1234,
        revenue: '$50,000',
        orders: 567,
      };
    },
    enabled: false, // Don't auto-fetch
  });

  return (
    <section className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        React Query Integration
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Leveraging React Query's built-in loading states
      </p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => refetch()} disabled={isLoading || isRefetching} size="sm">
            {isLoading ? 'Loading...' : 'Fetch Data'}
          </Button>
          {data && (
            <Button onClick={() => refetch()} isLoading={isRefetching} size="sm">
              Refresh
            </Button>
          )}
        </div>

        {isLoading ? (
          <SkeletonText lines={3} />
        ) : data ? (
          <SectionLoader isLoading={isRefetching} overlay={true}>
            <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.users}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.revenue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.orders}</p>
              </div>
            </div>
          </SectionLoader>
        ) : (
          <p className="italic text-gray-500 dark:text-gray-400">Click "Fetch Data" to load</p>
        )}
      </div>
    </section>
  );
};

// Scoped Loader Demo
const ScopedLoaderDemo = (): JSX.Element => {
  const { isLoading, startLoading, stopLoading } = useScopedLoader('demo-scoped', {
    minDisplayTime: 300,
  });

  const handleLoad = (): void => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 1500);
  };

  return (
    <section className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Scoped Loader Hook</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Component-specific loader with automatic cleanup and minimum display time (300ms)
      </p>

      <Button onClick={handleLoad} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Start Scoped Loader (1.5s)'}
      </Button>

      {isLoading && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="flex items-center gap-2">
            <InlineSpinner size="sm" />
            <span className="text-blue-900 dark:text-blue-200">
              Scoped loader is active (minimum 300ms display)
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

// API Loader Demo
const ApiLoaderDemo = (): JSX.Element => {
  const { startRequest, endRequest, requestCount, isLoading } = useApiLoader('demo-namespace');

  const handleMultipleRequests = (): void => {
    const ids: string[] = [];

    // Start 3 requests
    for (let i = 0; i < 3; i++) {
      const id = startRequest({ message: `Request ${i + 1}` });
      ids.push(id);
    }

    // End them at different times
    setTimeout(() => endRequest(ids[0]), 1000);
    setTimeout(() => endRequest(ids[1]), 2000);
    setTimeout(() => endRequest(ids[2]), 3000);
  };

  return (
    <section className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        API Loader Hook (Namespace Tracking)
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Track multiple concurrent requests by namespace
      </p>

      <div className="space-y-4">
        <Button onClick={handleMultipleRequests} disabled={isLoading}>
          Simulate 3 Concurrent Requests
        </Button>

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Active Requests in 'demo-namespace':
            </span>
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {requestCount}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${isLoading ? 'animate-pulse bg-green-500' : 'bg-gray-400'}`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? 'Loading' : 'Idle'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Async Loader Demo
const AsyncLoaderDemo = (): JSX.Element => {
  const { execute, isLoading, error } = useAsyncLoader({
    minDisplayTime: 300,
    debounceTime: 500,
    onSuccess: () => {
      console.log('Operation completed!');
    },
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
    if (value.length < 2) return;

    execute(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }).catch(console.error);
  };

  return (
    <section className="glass-light rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Async Loader Hook (with Debouncing)
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Wraps async operations with loading state, debouncing (500ms), and error handling
      </p>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Type to search (debounced 500ms)..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <InlineSpinner size="sm" />
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm text-red-900 dark:text-red-200">Error: {error.message}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoaderDemoPage;
