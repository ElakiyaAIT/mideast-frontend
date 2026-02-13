# 🚀 API Loader Integration Plan

## Executive Summary

This document provides a **complete implementation plan** for integrating the API loader system across your entire application. The goal is to create a production-ready, user-friendly, enterprise-grade loading experience similar to top SaaS applications.

---

## 📊 Current State Analysis

### ✅ What You Have

1. **Well-designed loader components:**
   - `GlobalLoader` - Full-page blocking loader
   - `SkeletonLoader` - Content placeholders with variants
   - `SectionLoader` - Partial page loaders
   - `InlineSpinner` - Small loading indicators
   - `Button` with `isLoading` prop

2. **Comprehensive hooks:**
   - `useGlobalLoader` - Global page-level loading
   - `useScopedLoader` - Component-specific loading
   - `useApiLoader` - Namespace-based API tracking
   - `useAsyncLoader` - Async operation wrapper

3. **Centralized state management:**
   - Redux store with `loaderSlice`
   - Request tracking with namespaces
   - Multiple concurrent request handling

4. **API interceptor ready:**
   - `apiLoaderInterceptor.ts` with automatic tracking
   - Helper functions: `disableLoader()`, `enableGlobalLoader()`, `withLoader()`

### ❌ What's Missing

1. **API interceptor NOT integrated** in `main.tsx`
2. **No loaders on pages** - HomePage, BuyPage, etc. are static
3. **No skeleton loaders** for data-driven content
4. **Form submissions** don't show loading states consistently
5. **No API data fetching** - Pages use hardcoded data

---

## 🎯 Implementation Strategy

### Phase 1: Foundation Setup (30 minutes)

#### Step 1.1: Enable API Interceptor

**File:** `src/main.tsx`

```typescript
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/css/style.css';
import './assets/css/animations.css';
import App from './app/App';
import axiosInstance from './api/axiosInstance';
import { store } from './store';
import { setupApiLoaderInterceptor } from './utils/apiLoaderInterceptor';

// Setup API loader interceptor ONCE
setupApiLoaderInterceptor(axiosInstance, store.dispatch);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**Result:** All API calls will now automatically show loaders unless explicitly disabled.

---

### Phase 2: Configure API Endpoints (1 hour)

#### Step 2.1: Add Loader Configuration to API Calls

For each API endpoint, configure appropriate loader behavior:

**File:** `src/api/authApi.ts`

```typescript
import { enableGlobalLoader, disableLoader } from '../utils/apiLoaderInterceptor';

export const authApi = {
  // ✅ Login - SHOW global loader (critical auth operation)
  login: async (data: LoginRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/login',
      data,
      enableGlobalLoader('Logging in...'),
    );
    return response.data;
  },

  // ✅ Register - SHOW global loader
  register: async (data: RegisterRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/register',
      data,
      enableGlobalLoader('Creating your account...'),
    );
    return response.data;
  },

  // ❌ Logout - DON'T show loader (fast operation)
  logout: async (): Promise<ApiResponse<LogoutResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<LogoutResponseDto>>(
      '/auth/logout',
      {},
      disableLoader(),
    );
    return response.data;
  },

  // ❌ Refresh token - SILENT (background operation)
  refreshToken: async (): Promise<ApiResponse<RefreshTokenResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<RefreshTokenResponseDto>>(
      '/auth/refresh',
      {},
      disableLoader(), // Always silent
    );
    return response.data;
  },

  // ✅ Get current user - SHOW loader (initial data fetch)
  getCurrentUser: async (): Promise<ApiResponse<UserProfileDto>> => {
    const response = await axiosInstance.get<ApiResponse<UserProfileDto>>('/auth/profile');
    return response.data;
  },

  // ✅ Forgot password - SHOW loader
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

  // ✅ Reset password - SHOW global loader
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
```

**Decision Matrix:**

| API Call         | Loader Type      | Reason                |
| ---------------- | ---------------- | --------------------- |
| `login`          | Global           | Critical auth flow    |
| `register`       | Global           | Account creation      |
| `logout`         | None             | Fast, non-blocking    |
| `refreshToken`   | **None**         | Background operation  |
| `getCurrentUser` | Scoped (default) | Initial data load     |
| `forgotPassword` | Global           | User expects feedback |
| `resetPassword`  | Global           | Critical operation    |

---

### Phase 3: Apply Loaders to Auth Pages (1 hour)

#### Step 3.1: Update Login Page

**File:** `src/pages/auth/LoginPage.tsx`

**Current State:** Already has `isLoading` on button ✅

```typescript
// Line 101-102: Google Sign In button
disabled={googleSignInMutation.isPending || loginMutation.isPending}

// Line 194: Submit button
isLoading={loginMutation.isPending}
```

**Status:** ✅ **Already implemented correctly!**

The LoginPage already uses:

- `loginMutation.isPending` for button loading state
- Button's `isLoading` prop to show spinner
- Disabled state during loading

**No changes needed.**

#### Step 3.2: Update Register Page

Same pattern as LoginPage - check if implemented.

#### Step 3.3: Update Forgot/Reset Password Pages

Same pattern - verify implementation.

---

### Phase 4: Apply Loaders to Data-Driven Pages (3 hours)

#### Step 4.1: Create Equipment API

**File:** `src/api/equipmentApi.ts` (NEW)

```typescript
import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../dto';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  weight: string;
  power: string;
  speed: string;
  engine: string;
  hours: number;
  location: string;
  status: 'newest' | 'for-auction' | 'sold';
}

export interface EquipmentFilters {
  category?: string[];
  make?: string[];
  year?: string[];
  state?: string[];
  priceRange?: [number, number];
  page?: number;
  limit?: number;
}

export interface EquipmentListResponse {
  items: Equipment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const equipmentApi = {
  // List equipment with filters
  getEquipment: async (filters: EquipmentFilters): Promise<ApiResponse<EquipmentListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<EquipmentListResponse>>('/equipment', {
      params: filters,
    });
    return response.data;
  },

  // Get single equipment details
  getEquipmentById: async (id: string): Promise<ApiResponse<Equipment>> => {
    const response = await axiosInstance.get<ApiResponse<Equipment>>(`/equipment/${id}`);
    return response.data;
  },

  // Featured equipment for homepage
  getFeaturedEquipment: async (): Promise<ApiResponse<Equipment[]>> => {
    const response = await axiosInstance.get<ApiResponse<Equipment[]>>('/equipment/featured');
    return response.data;
  },
};
```

#### Step 4.2: Create Equipment React Query Hook

**File:** `src/hooks/queries/useEquipment.ts` (NEW)

```typescript
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  equipmentApi,
  type Equipment,
  type EquipmentListResponse,
  type EquipmentFilters,
} from '../../api/equipmentApi';

export const equipmentKeys = {
  all: ['equipment'] as const,
  lists: () => [...equipmentKeys.all, 'list'] as const,
  list: (filters: EquipmentFilters) => [...equipmentKeys.lists(), filters] as const,
  details: () => [...equipmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...equipmentKeys.details(), id] as const,
  featured: () => [...equipmentKeys.all, 'featured'] as const,
};

/**
 * Fetch equipment list with filters
 */
export const useEquipmentList = (
  filters: EquipmentFilters,
): UseQueryResult<EquipmentListResponse, Error> => {
  return useQuery({
    queryKey: equipmentKeys.list(filters),
    queryFn: async () => {
      const response = await equipmentApi.getEquipment(filters);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch equipment');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Fetch single equipment details
 */
export const useEquipmentDetail = (id: string): UseQueryResult<Equipment, Error> => {
  return useQuery({
    queryKey: equipmentKeys.detail(id),
    queryFn: async () => {
      const response = await equipmentApi.getEquipmentById(id);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch equipment details');
      }
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Fetch featured equipment for homepage
 */
export const useFeaturedEquipment = (): UseQueryResult<Equipment[], Error> => {
  return useQuery({
    queryKey: equipmentKeys.featured(),
    queryFn: async () => {
      const response = await equipmentApi.getFeaturedEquipment();
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch featured equipment');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes (featured items change less frequently)
  });
};
```

#### Step 4.3: Update BuyPage with Loaders

**File:** `src/pages/public/BuyPage.tsx`

```typescript
import { TopBanner, Header, Footer } from '../../components/layout';
import { SkeletonCard } from '../../components';
import type { JSX } from 'react';
import { useState } from 'react';
import { useEquipmentList } from '../../hooks/queries/useEquipment';

const BuyPage = (): JSX.Element => {
  const [filters, setFilters] = useState({
    category: ['Articulated Trucks'],
    page: 1,
    limit: 6,
  });

  // Fetch equipment data
  const { data, isLoading, isError, error } = useEquipmentList(filters);

  return (
    <>
      <TopBanner />
      <Header />

      {/* Banner Section - Keep as is */}
      {/* ... */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Keep as is */}
          {/* ... */}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {isLoading
                  ? 'Loading...'
                  : `Showing ${data?.items.length ?? 0} of ${data?.total ?? 0} Results`}
              </span>
              <div className="flex gap-2">
                {/* View toggle buttons */}
              </div>
            </div>

            {/* Loading State - Show Skeleton Cards */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">
                  {error?.message ?? 'Failed to load equipment'}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loaded State - Show Equipment Cards */}
            {!isLoading && !isError && data && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.items.map((equipment) => (
                  <EquipmentCard key={equipment.id} equipment={equipment} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && data?.items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No equipment found</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            )}

            {/* Pagination - Update based on data */}
            {data && data.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                {/* Pagination controls */}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BuyPage;
```

**Key Changes:**

1. ✅ Added `useEquipmentList` hook for data fetching
2. ✅ Show `SkeletonCard` during loading
3. ✅ Handle error state with retry button
4. ✅ Handle empty state
5. ✅ Dynamic results count

#### Step 4.4: Update HomePage with Loaders

**File:** `src/pages/public/HomePage.tsx`

```typescript
// Add at the top
import { useFeaturedEquipment } from '../../hooks/queries/useEquipment';
import { SkeletonCard } from '../../components';

const HomePage = (): JSX.Element => {
  // Existing testimonial code...

  // Add featured equipment query
  const { data: featuredEquipment, isLoading: isFeaturedLoading } = useFeaturedEquipment();

  return (
    <>
      <TopBanner />
      <Header />

      {/* ... Hero, Auctions, Categories sections ... */}

      {/* Latest Equipment Section - UPDATE */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
          {/* ... Section header ... */}
        </div>

        {/* Loading State */}
        {isFeaturedLoading && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Loaded State */}
        {!isFeaturedLoading && featuredEquipment && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEquipment.map((equipment) => (
              <ProductCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        )}

        {/* ... View More button ... */}
      </section>

      {/* ... Rest of homepage ... */}
    </>
  );
};
```

---

### Phase 5: Background Operations - No Loaders (30 minutes)

#### Operations That Should NOT Show Loaders

**File:** Update `src/api/axiosInstance.ts`

The token refresh is already handled in the interceptor and should remain silent. Verify it uses `disableLoader()` implicitly:

```typescript
// Line 117-118 in axiosInstance.ts
// Token refresh should NOT show loader
refreshPromise = axios.post<ApiResponse<unknown>>(
  `${API_BASE_URL}/auth/refresh`,
  {},
  {
    withCredentials: true,
    // Ensure loader is disabled for refresh
    loader: { enableLoader: false },
  },
);
```

**Other Silent Operations:**

1. **Heartbeat/Keep-alive requests** - Add `disableLoader()`
2. **Analytics tracking** - Add `disableLoader()`
3. **Auto-save drafts** - Add `disableLoader()`
4. **Background sync** - Add `disableLoader()`

---

### Phase 6: Form Submissions (1 hour)

#### Step 6.1: Contact Form Example

**File:** `src/pages/public/ContactUsPage.tsx`

```typescript
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../components';

const ContactUsPage = (): JSX.Element => {
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await axiosInstance.post('/contact', data);
      return response.data;
    },
    onSuccess: () => {
      showToast.success('Message sent successfully!');
      reset(); // Reset form
    },
    onError: (error) => {
      showToast.error('Failed to send message');
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}

      <Button
        type="submit"
        isLoading={contactMutation.isPending}
        className="w-full"
      >
        Send Message
      </Button>
    </form>
  );
};
```

**Pattern:**

- ✅ Use `mutation.isPending` for loading state
- ✅ Pass to Button's `isLoading` prop
- ✅ Show success/error toast
- ✅ No need for manual loader management

---

## 📋 Loader Application Checklist

### ✅ Phase 1: Foundation

- [ ] Enable API interceptor in `main.tsx`
- [ ] Verify GlobalLoader renders in App.tsx
- [ ] Test interceptor with a simple API call

### ✅ Phase 2: API Configuration

- [ ] Configure auth API endpoints
- [ ] Configure user API endpoints
- [ ] Configure dashboard API endpoints
- [ ] Configure equipment API endpoints (new)
- [ ] Document which endpoints use which loader type

### ✅ Phase 3: Auth Pages

- [x] LoginPage (already implemented)
- [ ] RegisterPage
- [ ] ForgotPasswordPage
- [ ] ResetPasswordPage
- [ ] Verify Google Sign In loading state

### ✅ Phase 4: Public Pages

- [ ] HomePage - Featured equipment with skeleton
- [ ] BuyPage - Equipment list with skeleton
- [ ] BuyNowDetailsPage - Single equipment with skeleton
- [ ] SellPage - Form with button loading
- [ ] ContactUsPage - Form with button loading
- [ ] AboutUsPage - Static (no loaders needed)

### ✅ Phase 5: Background Operations

- [ ] Verify token refresh is silent
- [ ] Add `disableLoader()` to analytics calls (if any)
- [ ] Add `disableLoader()` to heartbeat calls (if any)

### ✅ Phase 6: Edge Cases

- [ ] Test concurrent API requests
- [ ] Test fast APIs (< 200ms) - verify no flicker
- [ ] Test slow APIs (> 3s) - verify loader persists
- [ ] Test error scenarios
- [ ] Test network offline scenarios

---

## 🎨 Loader UX Patterns Summary

### Pattern 1: Initial Page Load (Skeleton)

```typescript
const { data, isLoading } = useQuery({ ... });

if (isLoading) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

return <DataGrid data={data} />;
```

**Use for:** Product lists, user lists, dashboard cards

---

### Pattern 2: Form Submission (Button Loading)

```typescript
const { mutate, isPending } = useMutation({ ... });

<Button
  type="submit"
  isLoading={isPending}
>
  Submit
</Button>
```

**Use for:** Login, register, contact forms, profile updates

---

### Pattern 3: Global Loader (Critical Operations)

```typescript
// In API file
enableGlobalLoader('Processing payment...');

// OR in component
const { show, hide } = useGlobalLoader();

const handleCritical = async () => {
  show('Processing...');
  try {
    await criticalOperation();
  } finally {
    hide();
  }
};
```

**Use for:** Authentication, payment, account deletion

---

### Pattern 4: Section Refresh (Overlay)

```typescript
const { refetch, isRefetching } = useQuery({ ... });

<SectionLoader isLoading={isRefetching} overlay={true}>
  <DashboardWidget data={data} />
</SectionLoader>

<button onClick={() => refetch()}>Refresh</button>
```

**Use for:** Dashboard widgets, stats cards, refreshable sections

---

### Pattern 5: Silent (No Loader)

```typescript
// In API call
disableLoader();

// Example
const response = await axiosInstance.get('/heartbeat', disableLoader());
```

**Use for:** Token refresh, heartbeat, analytics, background sync

---

## 🔍 Testing Checklist

### Functional Testing

- [ ] All loaders appear when expected
- [ ] All loaders disappear after API completion
- [ ] Button loaders show spinner + disable button
- [ ] Skeleton loaders match final content layout
- [ ] Global loader blocks interaction
- [ ] Multiple concurrent requests handled correctly

### UX Testing

- [ ] No loader flicker for fast APIs (< 200ms)
- [ ] Loaders persist for slow APIs (> 2s)
- [ ] Minimum display time prevents flicker (300ms)
- [ ] Loading states are visually consistent
- [ ] Smooth transitions between loading and loaded states

### Edge Case Testing

- [ ] Network offline - proper error handling
- [ ] API timeout - loader eventually disappears
- [ ] Rapid button clicks - no duplicate requests
- [ ] Navigation during loading - loader cleanup
- [ ] Token refresh - silent and non-blocking

### Accessibility Testing

- [ ] Loaders have proper ARIA labels
- [ ] Screen readers announce loading states
- [ ] Keyboard navigation not broken during loading
- [ ] Focus management after loading completes

---

## 📐 Naming Conventions

### File Naming

```
✅ GOOD:
- useEquipment.ts (React Query hooks)
- equipmentApi.ts (API endpoints)
- EquipmentCard.tsx (Components)

❌ BAD:
- equipment.ts (ambiguous)
- equip.tsx (abbreviations)
- equipment_api.ts (underscores)
```

### Hook Naming

```typescript
// React Query - data fetching
useEquipmentList();
useFeaturedEquipment();
useEquipmentDetail();

// React Query - mutations
useCreateEquipment();
useUpdateEquipment();
useDeleteEquipment();

// Loader hooks
useGlobalLoader();
useScopedLoader('equipment-list');
useApiLoader('equipment');
```

### Loader Key Naming

```typescript
// Scoped loader keys
useScopedLoader('equipment-list');
useScopedLoader('dashboard-stats');
useScopedLoader('user-profile');

// API namespace
useApiLoader('equipment');
useApiLoader('dashboard');
useApiLoader('users');
```

---

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Loader Stuck Visible

**Problem:** Loader doesn't disappear after API call

**Solution:**

```typescript
// ❌ BAD - No error handling
const handleSubmit = async () => {
  startLoading();
  await api.submit();
  stopLoading(); // Never runs if error occurs
};

// ✅ GOOD - Use try/finally
const handleSubmit = async () => {
  startLoading();
  try {
    await api.submit();
  } finally {
    stopLoading(); // Always runs
  }
};

// ✅ BETTER - Use React Query (automatic cleanup)
const { mutate, isPending } = useMutation({ ... });
```

---

### Pitfall 2: Loader Flickers

**Problem:** Loader appears and disappears too quickly

**Solution:**

```typescript
// ✅ Use minimum display time
const { isLoading } = useScopedLoader('key', {
  minDisplayTime: 300, // 300ms minimum
});

// OR use debounce for search
const { execute, isLoading } = useAsyncLoader({
  debounceTime: 500, // Only show if > 500ms
});
```

---

### Pitfall 3: Multiple Loaders Conflict

**Problem:** Global loader blocks UI while fetching multiple things

**Solution:**

```typescript
// ❌ BAD - Global loader blocks everything
const { show, hide } = useGlobalLoader();
const loadDashboard = async () => {
  show();
  await Promise.all([fetchStats(), fetchCharts(), fetchActivity()]);
  hide();
};

// ✅ GOOD - Individual skeleton loaders
const StatsCard = () => {
  const { data, isLoading } = useQuery(['stats'], fetchStats);
  return isLoading ? <SkeletonCard /> : <Stats data={data} />;
};

const ChartsCard = () => {
  const { data, isLoading } = useQuery(['charts'], fetchCharts);
  return isLoading ? <SkeletonCard /> : <Charts data={data} />;
};
```

---

## 📊 Performance Optimization

### 1. Debounce Fast Operations

```typescript
// Search input - don't show loader immediately
const { execute, isLoading } = useAsyncLoader({
  debounceTime: 500, // Wait 500ms before showing loader
});
```

### 2. Optimistic Updates

```typescript
// Don't show loader for instant feedback
const updateMutation = useMutation({
  mutationFn: updateItem,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['items']);

    // Snapshot previous value
    const previous = queryClient.getQueryData(['items']);

    // Optimistically update
    queryClient.setQueryData(['items'], newData);

    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['items'], context.previous);
  },
});
```

### 3. Skeleton Loader Best Practices

```typescript
// ✅ Match skeleton to content structure
<SkeletonCard /> // For product card
<SkeletonText lines={3} /> // For text paragraph
<SkeletonAvatar size="48px" /> // For user avatar

// ❌ Don't use generic spinner for content
<div className="flex justify-center">
  <Spinner /> {/* Too generic */}
</div>
```

---

## 🎓 Final Implementation Steps

### Step 1: Setup Foundation (Day 1)

1. Enable API interceptor in `main.tsx`
2. Test with one API endpoint
3. Verify GlobalLoader works
4. Create equipment API + hooks

### Step 2: Apply to Pages (Day 2-3)

1. Update BuyPage with skeleton loaders
2. Update HomePage featured section
3. Update BuyNowDetailsPage
4. Add form loading states

### Step 3: Polish & Test (Day 4)

1. Run through all pages
2. Test edge cases
3. Check accessibility
4. Optimize performance
5. Document any custom patterns

### Step 4: Production Ready (Day 5)

1. Final QA pass
2. Performance audit
3. Update documentation
4. Deploy to staging
5. User acceptance testing

---

## 📞 Support & Reference

- **Quick Reference:** `LOADER_QUICK_REFERENCE.md`
- **Full Guide:** `API_LOADER_GUIDE.md` (if exists)
- **Components:** `src/components/Loader/`
- **Hooks:** `src/hooks/useLoader.ts`
- **Interceptor:** `src/utils/apiLoaderInterceptor.ts`

---

**Last Updated:** 2026-01-24
**Status:** Ready for Implementation ✅
