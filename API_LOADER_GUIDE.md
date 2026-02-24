# 🚀 API Loading System - Complete Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Loading Strategy Matrix](#loading-strategy-matrix)
4. [Components](#components)
5. [Hooks](#hooks)
6. [Implementation Examples](#implementation-examples)
7. [Best Practices](#best-practices)
8. [Performance Considerations](#performance-considerations)

---

## Overview

This application implements a **3-tier loading system** optimized for enterprise-grade UX:

### ✅ Features

- **Smart Loading States**: Global, scoped, and component-level loaders
- **Minimum Display Time**: Prevents flicker (300ms default)
- **Concurrent Request Tracking**: Handles multiple simultaneous API calls
- **React Query Integration**: Leverages built-in loading states
- **Skeleton Loaders**: Better perceived performance
- **Type-Safe**: Full TypeScript support
- **Accessible**: ARIA labels and semantic HTML

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│           Loading System Architecture           │
└─────────────────────────────────────────────────┘

Layer 1: Global Loaders (Critical Operations)
├── Authentication flows
├── App initialization
└── Critical page transitions

Layer 2: React Query (Component Data Fetching)
├── useQuery for GET requests
├── useMutation for POST/PUT/DELETE
└── Automatic loading state management

Layer 3: Local UI States
├── Button loading states
├── Section loaders
├── Skeleton loaders
└── Inline spinners
```

---

## Loading Strategy Matrix

### When to Use Each Loader Type

| Scenario            | Loader Type            | Example            |
| ------------------- | ---------------------- | ------------------ |
| **Login/Logout**    | GlobalLoader           | Auth operations    |
| **Page-level data** | React Query + Skeleton | Dashboard, Profile |
| **Section updates** | SectionLoader          | Refresh card data  |
| **Form submission** | Button loading         | Submit, Save       |
| **Background sync** | None (silent)          | Auto-save draft    |
| **List items**      | SkeletonLoader         | Product cards      |
| **Inline actions**  | InlineSpinner          | Delete icon        |
| **Navigation**      | None                   | Route changes      |

### ❌ When NOT to Show Loaders

- **Route navigation** (use Suspense fallback instead)
- **Fast operations** (< 200ms - use debouncing)
- **Background operations** (polling, silent sync)
- **Prefetching** (silent data loading)
- **Optimistic updates** (show result immediately)

---

## Components

### 1. GlobalLoader

**Full-page overlay loader for critical operations.**

```tsx
// Already integrated in App.tsx
import { GlobalLoader } from '@/components';

// Manual control via hook
const { show, hide } = useGlobalLoader();

show('Logging in...');
// ... async operation
hide();
```

**When to use:**

- Authentication (login/logout)
- App initialization
- Critical page-level operations

**When NOT to use:**

- Regular page navigation
- Standard CRUD operations
- Concurrent requests (shows one at a time)

---

### 2. SkeletonLoader

**Content placeholders for better perceived performance.**

```tsx
import {
  SkeletonLoader,
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonImage
} from '@/components';

// Basic usage
<SkeletonLoader variant="text" count={3} />
<SkeletonLoader variant="circle" width="48px" height="48px" />
<SkeletonLoader variant="rectangle" width="100%" height="200px" />

// Pre-built layouts
<SkeletonCard />
<SkeletonText lines={5} />
<SkeletonAvatar size="64px" />
<SkeletonImage width="100%" height="300px" />

// Custom speed
<SkeletonLoader variant="text" speed="fast" />
```

**Example: Product List**

```tsx
const ProductList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
```

---

### 3. SectionLoader

**Loader for specific sections/cards with overlay or replacement mode.**

```tsx
import { SectionLoader } from '@/components';

// Overlay mode (dims content, shows loader on top)
<SectionLoader isLoading={isRefreshing} overlay={true}>
  <Card>
    <CardContent />
  </Card>
</SectionLoader>

// Replace mode (replaces content with loader)
<SectionLoader
  isLoading={isLoading}
  overlay={false}
  size="md"
  message="Loading data..."
  minHeight="300px"
>
  <DataTable />
</SectionLoader>
```

**Example: Dashboard Card**

```tsx
const DashboardCard = () => {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchStats,
  });

  return (
    <div className="card">
      <button onClick={() => refetch()}>Refresh</button>

      <SectionLoader isLoading={isRefetching} overlay={true}>
        <div className="stats">
          <Stat label="Users" value={data?.users} />
          <Stat label="Revenue" value={data?.revenue} />
        </div>
      </SectionLoader>
    </div>
  );
};
```

---

### 4. InlineSpinner

**Small spinner for inline use.**

```tsx
import { InlineSpinner } from '@/components';

<div className="flex items-center gap-2">
  <InlineSpinner size="sm" variant="primary" />
  <span>Loading...</span>
</div>

// In a button
<button>
  {isLoading && <InlineSpinner size="xs" variant="white" />}
  Save
</button>
```

---

### 5. Button with Loading State

**Already implemented in your Button component!**

```tsx
import { Button } from '@/components';

const { mutate, isPending } = useMutation({
  mutationFn: submitForm,
});

<Button onClick={() => mutate(data)} isLoading={isPending} disabled={isPending}>
  Submit
</Button>;
```

---

## Hooks

### 1. useGlobalLoader

**Manage global full-page loader.**

```tsx
const { isLoading, show, hide } = useGlobalLoader();

const handleLogout = async () => {
  show('Logging out...');
  try {
    await logout();
  } finally {
    hide();
  }
};
```

---

### 2. useScopedLoader

**Component-specific loader with automatic cleanup and minimum display time.**

```tsx
const { isLoading, startLoading, stopLoading } = useScopedLoader('profile-section', {
  minDisplayTime: 300, // Prevent flicker
});

const refreshProfile = async () => {
  startLoading();
  try {
    await fetchProfile();
  } finally {
    stopLoading(); // Automatically respects minDisplayTime
  }
};

return (
  <SectionLoader isLoading={isLoading}>
    <ProfileContent />
  </SectionLoader>
);
```

---

### 3. useApiLoader

**Track API requests with namespaces.**

```tsx
const { startRequest, endRequest, isLoading, requestCount } = useApiLoader('dashboard');

const fetchData = async () => {
  const requestId = startRequest({
    message: 'Loading dashboard...',
    type: 'scoped',
  });

  try {
    await api.getDashboard();
  } finally {
    endRequest(requestId);
  }
};

// Shows number of active requests in this namespace
console.log(`Active requests: ${requestCount}`);
```

---

### 4. useAsyncLoader

**Wrapper for async operations with loading state, error handling, and debouncing.**

```tsx
const { execute, isLoading, error } = useAsyncLoader({
  minDisplayTime: 300,
  debounceTime: 500, // Debounce fast operations
  onSuccess: (result) => {
    showToast.success('Operation completed!');
  },
  onError: (error) => {
    showToast.error(error.message);
  },
});

const handleSearch = () => {
  execute(async () => {
    const results = await api.search(query);
    setResults(results);
    return results;
  });
};

return (
  <div>
    <SearchInput onChange={handleSearch} />
    {isLoading && <InlineSpinner />}
    {error && <ErrorMessage error={error} />}
  </div>
);
```

---

## Implementation Examples

### Example 1: Authentication Flow (Global Loader)

```tsx
// src/pages/auth/LoginPage.tsx
import { useLogin } from '@/hooks/queries/useAuth';
import { Button } from '@/components';

const LoginPage = () => {
  const { mutate, isPending } = useLogin();

  const handleSubmit = (data: LoginData) => {
    // React Query mutation handles loading state
    // useLogin hook shows global loader internally if needed
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="email" />
      <Input name="password" type="password" />
      <Button type="submit" isLoading={isPending}>
        Login
      </Button>
    </form>
  );
};
```

**Pro tip:** For auth flows, you can add global loader in the mutation:

```tsx
// src/hooks/queries/useAuth.ts
export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      // Show global loader for critical auth operation
      dispatch(showGlobalLoader('Logging in...'));

      try {
        const response = await authApi.login(credentials);
        return response.data.user;
      } finally {
        dispatch(hideGlobalLoader());
      }
    },
    onSuccess: (user) => {
      // ... rest of the logic
    },
  });
};
```

---

### Example 2: Dashboard with Multiple Data Sources

```tsx
// src/pages/DashboardPage.tsx
import { useQuery } from '@tanstack/react-query';
import { SkeletonCard, SectionLoader } from '@/components';

const DashboardPage = () => {
  // Multiple concurrent requests
  const statsQuery = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchStats,
  });

  const activityQuery = useQuery({
    queryKey: ['recent-activity'],
    queryFn: fetchActivity,
  });

  const chartsQuery = useQuery({
    queryKey: ['charts'],
    queryFn: fetchCharts,
  });

  return (
    <div className="dashboard">
      {/* Stats Section - Skeleton while loading */}
      <section className="stats-grid">
        {statsQuery.isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          statsQuery.data?.map((stat) => <StatCard key={stat.id} {...stat} />)
        )}
      </section>

      {/* Activity Feed - Section loader */}
      <section className="activity">
        <h2>Recent Activity</h2>
        <SectionLoader isLoading={activityQuery.isLoading} overlay={false} minHeight="400px">
          <ActivityFeed data={activityQuery.data} />
        </SectionLoader>
      </section>

      {/* Charts - Skeleton */}
      <section className="charts">
        {chartsQuery.isLoading ? (
          <SkeletonImage height="400px" />
        ) : (
          <Chart data={chartsQuery.data} />
        )}
      </section>
    </div>
  );
};
```

---

### Example 3: Optimistic Updates (No Loader)

```tsx
// src/components/LikeButton.tsx
const LikeButton = ({ postId, initialLikes }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: likePost,

    // Optimistic update - no loader needed!
    onMutate: async (postId) => {
      await queryClient.cancelQueries(['post', postId]);

      const previousData = queryClient.getQueryData(['post', postId]);

      // Update immediately
      queryClient.setQueryData(['post', postId], (old) => ({
        ...old,
        likes: old.likes + 1,
        isLiked: true,
      }));

      return { previousData };
    },

    onError: (err, postId, context) => {
      // Rollback on error
      queryClient.setQueryData(['post', postId], context.previousData);
    },
  });

  return <button onClick={() => mutate(postId)}>❤️ {initialLikes}</button>;
};
```

---

### Example 4: Background Polling (Silent)

```tsx
// src/hooks/useNotifications.ts
const useNotifications = () => {
  // Silent background polling - no loader
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchInterval: 30000, // Poll every 30s
    refetchIntervalInBackground: true,

    // Don't show loading state for background refetch
    notifyOnChangeProps: ['data', 'error'],
  });
};
```

---

### Example 5: Search with Debouncing

```tsx
// src/components/SearchBar.tsx
import { useAsyncLoader } from '@/hooks/useLoader';
import { InlineSpinner } from '@/components';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const { execute, isLoading } = useAsyncLoader({
    debounceTime: 500, // Wait 500ms before searching
    minDisplayTime: 0, // No minimum for search
  });

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    execute(async () => {
      const data = await api.search(value);
      setResults(data);
      return data;
    });
  };

  return (
    <div>
      <div className="relative">
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <InlineSpinner size="sm" />
          </div>
        )}
      </div>

      <SearchResults results={results} />
    </div>
  );
};
```

---

### Example 6: File Upload with Progress

```tsx
// src/components/FileUpload.tsx
import { useState } from 'react';
import { Button, InlineSpinner } from '@/components';

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);

    try {
      await uploadFile(file, (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      });

      showToast.success('File uploaded!');
    } catch (error) {
      showToast.error('Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} />

      {uploading && (
        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2">
            <InlineSpinner size="sm" />
            <span>Uploading... {progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-primary-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
```

---

### Example 7: Infinite Scroll with Loading States

```tsx
// src/components/InfiniteList.tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { SkeletonCard, InlineSpinner } from '@/components';

const InfiniteList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Initial loading - show skeletons
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {data.pages.map((page) => page.items.map((item) => <PostCard key={item.id} {...item} />))}

      {/* Load More Button - button loading state */}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} className="mt-4">
          Load More
        </Button>
      )}

      {/* Or infinite scroll with inline spinner */}
      {isFetchingNextPage && (
        <div className="flex justify-center p-4">
          <InlineSpinner size="md" />
        </div>
      )}
    </div>
  );
};
```

---

## Best Practices

### ✅ DO

1. **Use React Query for data fetching** - Built-in loading states
2. **Show skeletons for initial load** - Better perceived performance
3. **Use button loading for actions** - Clear feedback on user actions
4. **Implement minimum display time** - Prevent flicker (300ms)
5. **Debounce fast operations** - Avoid loader flash for < 200ms
6. **Use scoped loaders for sections** - Don't block entire UI
7. **Handle concurrent requests** - Track multiple API calls
8. **Provide meaningful messages** - "Logging in..." vs "Loading..."
9. **Use optimistic updates** - Skip loaders when possible
10. **Test on slow networks** - Use Chrome DevTools throttling

### ❌ DON'T

1. **Don't show loaders for route navigation** - Use Suspense instead
2. **Don't block UI unnecessarily** - Use scoped loaders
3. **Don't show loaders for fast operations** - < 200ms
4. **Don't use global loader for everything** - Reserve for critical ops
5. **Don't forget error states** - Always handle errors
6. **Don't skip accessibility** - Use ARIA labels
7. **Don't overuse spinners** - Consider skeletons
8. **Don't show multiple global loaders** - One at a time
9. **Don't forget cleanup** - Clear loaders on unmount
10. **Don't ignore minimum display time** - Prevents jarring UX

---

## Performance Considerations

### 1. Minimum Display Time

**Problem:** Loaders that flash for < 200ms are jarring and reduce perceived performance.

**Solution:** Implement 300ms minimum display time.

```tsx
const { isLoading, startLoading, stopLoading } = useScopedLoader('section', {
  minDisplayTime: 300, // ✅
});
```

### 2. Debouncing Fast APIs

**Problem:** Fast APIs (< 200ms) don't need loaders, but may occasionally be slow.

**Solution:** Debounce loader display.

```tsx
const { execute, isLoading } = useAsyncLoader({
  debounceTime: 200, // Only show loader if > 200ms
});
```

### 3. Concurrent Requests

**Problem:** Multiple simultaneous API calls can cause loader conflicts.

**Solution:** Use namespace-based request tracking.

```tsx
const { startRequest, endRequest } = useApiLoader('dashboard');

// Track multiple requests in same namespace
const req1 = startRequest();
const req2 = startRequest();

// Both complete independently
endRequest(req1);
endRequest(req2);
```

### 4. React Query Optimization

**Leverage React Query's built-in features:**

```tsx
useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes

  // Don't show loading for background refetch
  notifyOnChangeProps: ['data', 'error'],

  // Prefetch on hover
  placeholderData: (previousData) => previousData,
});
```

### 5. Skeleton vs Spinner Decision Tree

```
Is it a list of items?
├─ Yes → Use SkeletonLoader
│   └─ Multiple cards/items
│
└─ No → Is it replacing content?
    ├─ Yes → Use SectionLoader
    │   └─ Dashboard cards, sections
    │
    └─ No → Is it a user action?
        ├─ Yes → Use Button loading
        │   └─ Submit, Save, Delete
        │
        └─ No → Use InlineSpinner
            └─ Small indicators
```

---

## Testing Checklist

### ✅ UX Validation

- [ ] No loaders flash < 300ms
- [ ] Loaders appear for slow operations (> 300ms)
- [ ] Multiple concurrent requests handled gracefully
- [ ] Global loader only for critical operations
- [ ] Button states update correctly
- [ ] Error handling works with loaders
- [ ] Skeleton layouts match actual content
- [ ] Loaders are accessible (ARIA labels)
- [ ] Mobile experience is smooth
- [ ] Slow network (3G) is acceptable

### ✅ Network Simulation

Use Chrome DevTools > Network > Throttling:

- **Fast 3G** (100ms latency)
- **Slow 3G** (400ms latency)
- **Offline**

Test that loaders:

1. Appear at appropriate times
2. Don't block unnecessary UI
3. Provide clear feedback
4. Handle errors gracefully

---

## Summary

### Loading System Hierarchy

```
1. Global Loader (Top Priority)
   └─ Authentication, critical operations

2. React Query States (Default for Data)
   └─ All data fetching operations

3. Component Loaders (UI-Specific)
   ├─ Skeleton loaders (lists, cards)
   ├─ Section loaders (partial updates)
   ├─ Button loaders (user actions)
   └─ Inline spinners (small indicators)
```

### Quick Decision Guide

**"Should I show a loader?"**

1. **Is it < 200ms?** → No loader (debounce)
2. **Is it auth/critical?** → Global loader
3. **Is it data fetching?** → React Query (skeleton/section)
4. **Is it user action?** → Button loading
5. **Is it background?** → No loader (silent)

---

## Additional Resources

- **React Query Docs**: https://tanstack.com/query/latest
- **Accessibility**: https://www.w3.org/WAI/ARIA/apg/
- **Performance**: https://web.dev/performance/

---

**Last Updated:** 2026-01-24
**Version:** 1.0.0
