# 💻 API Loader - Complete Code Examples

This document contains **ready-to-use code** for implementing loaders across your application.

---

## 📋 Table of Contents

1. [Foundation Setup](#foundation-setup)
2. [API Configuration Examples](#api-configuration-examples)
3. [Page Implementation Examples](#page-implementation-examples)
4. [Component Patterns](#component-patterns)
5. [Common Scenarios](#common-scenarios)

---

## Foundation Setup

### 1. Enable API Interceptor

**File:** `src/main.tsx`

Replace your current main.tsx with:

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/css/style.css';
import './assets/css/animations.css';
import App from './app/App';

// Import for API loader interceptor setup
import axiosInstance from './api/axiosInstance';
import { store } from './store';
import { setupApiLoaderInterceptor } from './utils/apiLoaderInterceptor';

// ✅ Setup API loader interceptor ONCE at app startup
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

**What this does:**

- Automatically tracks ALL API requests
- Shows loaders by default
- Can be disabled per-request

---

## API Configuration Examples

### 2. Update Auth API with Loaders

**File:** `src/api/authApi.ts`

Replace the entire file with:

```typescript
import axiosInstance from './axiosInstance';
import type {
  LoginRequestDto,
  RegisterRequestDto,
  AuthResponseDto,
  RefreshTokenResponseDto,
  LogoutResponseDto,
  UserProfileDto,
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  GoogleSignInRequestDto,
} from '../dto';
import type { ApiResponse } from '../dto';
import { enableGlobalLoader, disableLoader, withLoader } from '../utils/apiLoaderInterceptor';

export const authApi = {
  /**
   * Login - Shows GLOBAL loader (blocks UI)
   * User expects visual feedback during authentication
   */
  login: async (data: LoginRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/login',
      data,
      enableGlobalLoader('Logging in...'),
    );
    return response.data;
  },

  /**
   * Register - Shows GLOBAL loader
   * Critical account creation operation
   */
  register: async (data: RegisterRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/register',
      data,
      enableGlobalLoader('Creating your account...'),
    );
    return response.data;
  },

  /**
   * Logout - SILENT (no loader)
   * Fast operation, no need to block UI
   */
  logout: async (): Promise<ApiResponse<LogoutResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<LogoutResponseDto>>(
      '/auth/logout',
      {},
      disableLoader(), // ❌ No loader
    );
    return response.data;
  },

  /**
   * Refresh Token - ALWAYS SILENT
   * Background operation, should never show loader
   */
  refreshToken: async (): Promise<ApiResponse<RefreshTokenResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<RefreshTokenResponseDto>>(
      '/auth/refresh',
      {},
      disableLoader(), // ❌ Always silent
    );
    return response.data;
  },

  /**
   * Get Current User - SCOPED loader (default)
   * Shows loader but doesn't block entire UI
   */
  getCurrentUser: async (): Promise<ApiResponse<UserProfileDto>> => {
    const response = await axiosInstance.get<ApiResponse<UserProfileDto>>(
      '/auth/profile',
      // Uses default scoped loader, no config needed
    );
    return response.data;
  },

  /**
   * Forgot Password - Shows GLOBAL loader
   * User expects feedback for email sending
   */
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

  /**
   * Google Sign In - Shows GLOBAL loader
   * Critical authentication flow
   */
  googleSignIn: async (data: GoogleSignInRequestDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseDto>>(
      '/auth/google-signin',
      data,
      enableGlobalLoader('Signing in with Google...'),
    );
    return response.data;
  },

  /**
   * Reset Password - Shows GLOBAL loader
   * Important account security operation
   */
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

**Key Points:**

- ✅ Critical auth operations use `enableGlobalLoader()` with messages
- ❌ Fast/background operations use `disableLoader()`
- 🔄 Default behavior (scoped loader) for normal API calls

---

### 3. Create Equipment API (NEW)

**File:** `src/api/equipmentApi.ts` (create this new file)

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
  description?: string;
}

export interface EquipmentFilters {
  category?: string[];
  make?: string[];
  year?: string[];
  state?: string[];
  priceMin?: number;
  priceMax?: number;
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
  /**
   * Get equipment list with filters
   * Uses SCOPED loader (default) - doesn't block UI
   */
  getEquipment: async (
    filters: EquipmentFilters = {},
  ): Promise<ApiResponse<EquipmentListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<EquipmentListResponse>>('/equipment', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get single equipment details
   * Uses SCOPED loader (default)
   */
  getEquipmentById: async (id: string): Promise<ApiResponse<Equipment>> => {
    const response = await axiosInstance.get<ApiResponse<Equipment>>(`/equipment/${id}`);
    return response.data;
  },

  /**
   * Get featured equipment for homepage
   * Uses SCOPED loader (default)
   */
  getFeaturedEquipment: async (limit: number = 3): Promise<ApiResponse<Equipment[]>> => {
    const response = await axiosInstance.get<ApiResponse<Equipment[]>>('/equipment/featured', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Search equipment
   * Uses SCOPED loader (default)
   */
  searchEquipment: async (query: string): Promise<ApiResponse<Equipment[]>> => {
    const response = await axiosInstance.get<ApiResponse<Equipment[]>>('/equipment/search', {
      params: { q: query },
    });
    return response.data;
  },
};
```

---

### 4. Create Equipment React Query Hooks

**File:** `src/hooks/queries/useEquipment.ts` (create this new file)

```typescript
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  equipmentApi,
  type Equipment,
  type EquipmentListResponse,
  type EquipmentFilters,
} from '../../api/equipmentApi';

// Query keys for caching and invalidation
export const equipmentKeys = {
  all: ['equipment'] as const,
  lists: () => [...equipmentKeys.all, 'list'] as const,
  list: (filters: EquipmentFilters) => [...equipmentKeys.lists(), filters] as const,
  details: () => [...equipmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...equipmentKeys.details(), id] as const,
  featured: () => [...equipmentKeys.all, 'featured'] as const,
  search: (query: string) => [...equipmentKeys.all, 'search', query] as const,
};

/**
 * Fetch equipment list with filters
 *
 * Features:
 * - Automatic loading state via isLoading
 * - Automatic error handling
 * - Caching with 5-minute stale time
 * - Refetch on window focus
 */
export const useEquipmentList = (
  filters: EquipmentFilters = {},
): UseQueryResult<EquipmentListResponse, Error> => {
  return useQuery({
    queryKey: equipmentKeys.list(filters),
    queryFn: async (): Promise<EquipmentListResponse> => {
      const response = await equipmentApi.getEquipment(filters);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch equipment');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
    retry: 2, // Retry failed requests twice
  });
};

/**
 * Fetch single equipment details
 *
 * Features:
 * - Only fetches when ID is provided
 * - Longer stale time (10 minutes) for details
 * - Automatic caching
 */
export const useEquipmentDetail = (id: string | undefined): UseQueryResult<Equipment, Error> => {
  return useQuery({
    queryKey: equipmentKeys.detail(id ?? ''),
    queryFn: async (): Promise<Equipment> => {
      if (!id) throw new Error('Equipment ID required');
      const response = await equipmentApi.getEquipmentById(id);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch equipment details');
      }
      return response.data;
    },
    enabled: !!id, // Only run query when ID exists
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Fetch featured equipment for homepage
 *
 * Features:
 * - Longer stale time (15 minutes)
 * - Featured items change less frequently
 */
export const useFeaturedEquipment = (limit: number = 3): UseQueryResult<Equipment[], Error> => {
  return useQuery({
    queryKey: [...equipmentKeys.featured(), limit],
    queryFn: async (): Promise<Equipment[]> => {
      const response = await equipmentApi.getFeaturedEquipment(limit);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch featured equipment');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

/**
 * Search equipment
 *
 * Features:
 * - Debounced search (pair with useDebounce hook)
 * - Shorter stale time for search results
 */
export const useEquipmentSearch = (query: string): UseQueryResult<Equipment[], Error> => {
  return useQuery({
    queryKey: equipmentKeys.search(query),
    queryFn: async (): Promise<Equipment[]> => {
      const response = await equipmentApi.searchEquipment(query);
      if (!response.success) {
        throw new Error(response.message ?? 'Search failed');
      }
      return response.data;
    },
    enabled: query.length >= 2, // Only search when query is 2+ characters
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
  });
};
```

---

## Page Implementation Examples

### 5. BuyPage with Skeleton Loaders

**File:** `src/pages/public/BuyPage.tsx`

Complete implementation with loaders:

```typescript
import { TopBanner, Header, Footer } from '../../components/layout';
import { SkeletonCard } from '../../components';
import type { JSX } from 'react';
import { useState } from 'react';
import { useEquipmentList } from '../../hooks/queries/useEquipment';
import type { EquipmentFilters } from '../../api/equipmentApi';

// Import your existing images
import buynowBanner from '../../assets/images/buynow-banner.png';

const BuyPage = (): JSX.Element => {
  const [filters, setFilters] = useState<EquipmentFilters>({
    category: [],
    page: 1,
    limit: 6,
  });

  // ✅ Fetch equipment data with automatic loader
  const { data, isLoading, isError, error, refetch } = useEquipmentList(filters);

  const handleApplyFilters = () => {
    // Filters are applied automatically via useEquipmentList dependency
    // Just update the state
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <>
      <TopBanner />
      <Header />

      {/* Banner Section */}
      <div className="relative bg-gray-800 h-64 flex items-center justify-center overflow-hidden br-30">
        <img
          alt="Construction background"
          className="absolute inset-0 w-full h-full object-cover"
          src={buynowBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight uppercase">
            Inventory
          </h1>
          <div className="mt-2 text-primary font-medium text-sm flex items-center justify-center gap-2">
            <span className="text-gray-400">Home</span>
            <span className="material-icons text-xs text-gray-500">chevron_right</span>
            <span>Inventory</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filter</h2>
              <button
                onClick={() => setFilters({ page: 1, limit: 6 })}
                className="text-primary text-sm font-medium hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                Active Results
              </span>
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                {isLoading ? '...' : `${data?.total ?? 0} FOUND`}
              </span>
            </div>

            {/* Filter sections - keep your existing filter UI */}
            <button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-lg flex justify-between items-center px-6 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
            >
              APPLY FILTERS
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">
                {isLoading ? '...' : `${data?.total ?? 0} FOUND`}
              </span>
            </button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {isLoading
                  ? 'Loading...'
                  : `Showing ${((data?.page ?? 1) - 1) * (data?.limit ?? 6) + 1}-${Math.min((data?.page ?? 1) * (data?.limit ?? 6), data?.total ?? 0)} of ${data?.total ?? 0} Results`}
              </span>
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-md">
                  <span className="material-icons text-xl">grid_view</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-3xl hover:bg-gray-200">
                  <span className="material-icons text-xl">list</span>
                </button>
              </div>
            </div>

            {/* ✅ LOADING STATE - Show Skeleton Cards */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* ❌ ERROR STATE */}
            {isError && !isLoading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                  <span className="material-icons text-red-500 text-3xl">error_outline</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Failed to Load Equipment
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {error?.message ?? 'Something went wrong'}
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* ✅ SUCCESS STATE - Show Equipment Cards */}
            {!isLoading && !isError && data && data.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.items.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <div
                        className={`absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 uppercase rounded-full shadow-lg ${
                          equipment.status === 'newest'
                            ? 'bg-green-500'
                            : equipment.status === 'for-auction'
                              ? 'bg-blue-500'
                              : 'bg-red-500'
                        }`}
                      >
                        {equipment.status.replace('-', ' ')}
                      </div>
                      <img
                        alt={equipment.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={equipment.image}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-4">{equipment.name}</h3>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-[14px] font-bold">{equipment.weight}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-medium">
                            Assembly Weight
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-bold">{equipment.power}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-medium">
                            Gross Power
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-bold">{equipment.speed}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-medium">
                            Max Speed
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-bold">{equipment.engine}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-medium">
                            Engine
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-bold">{equipment.hours}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-medium">
                            Hours
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-bold">{equipment.location}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-medium">
                            Location
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-gray-100 dark:border-gray-800 pt-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold">
                            Retail Price
                          </p>
                          <p className="text-xl font-bold text-primary">
                            ${equipment.price.toLocaleString()}
                          </p>
                        </div>
                        <button className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase transition-colors">
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 📭 EMPTY STATE */}
            {!isLoading && !isError && data && data.items.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <span className="material-icons text-gray-400 text-3xl">inventory_2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Equipment Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, (data?.page ?? 1) - 1))}
                  disabled={data.page === 1 || isLoading}
                  className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-3xl font-bold hover:bg-gray-100 disabled:opacity-50"
                >
                  <span className="material-icons">chevron_left</span>
                </button>

                {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={isLoading}
                      className={`w-10 h-10 flex items-center justify-center rounded-3xl font-bold ${
                        data.page === page
                          ? 'bg-primary text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
                      } disabled:opacity-50`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    handlePageChange(Math.min(data.totalPages, (data?.page ?? 1) + 1))
                  }
                  disabled={data.page === data.totalPages || isLoading}
                  className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-3xl font-bold hover:bg-gray-100 disabled:opacity-50"
                >
                  <span className="material-icons">chevron_right</span>
                </button>
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

**Key Features:**

- ✅ Skeleton loaders during data fetch
- ✅ Error state with retry button
- ✅ Empty state with helpful message
- ✅ Pagination with loading state
- ✅ Dynamic result count
- ✅ Automatic loader via React Query

---

### 6. HomePage with Featured Equipment Loaders

**File:** `src/pages/public/HomePage.tsx`

Update just the "Latest Equipment" section:

```typescript
// Add these imports at the top
import { useFeaturedEquipment } from '../../hooks/queries/useEquipment';
import { SkeletonCard } from '../../components';

// Inside HomePage component, add this hook:
const { data: featuredEquipment, isLoading: isFeaturedLoading } = useFeaturedEquipment(3);

// Replace the "Latest Equipment" section with this:
<section className="py-20 bg-slate-50 dark:bg-slate-900/50">
  <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
    <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
      Our Products
    </p>
    <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white uppercase">
      Latest Equipment
    </h2>
    <div className="w-16 h-1 bg-primary mx-auto my-4"></div>
    <p className="text-slate-500 max-w-2xl mx-auto">
      Adhering to the recommended maintenance schedule of your machine is one of the most
      effective ways to ensure it stays performing at its best.
    </p>
  </div>

  {/* ✅ LOADING STATE */}
  {isFeaturedLoading && (
    <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )}

  {/* ✅ LOADED STATE */}
  {!isFeaturedLoading && featuredEquipment && featuredEquipment.length > 0 && (
    <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredEquipment.map((equipment) => (
        <div
          key={equipment.id}
          className="bg-white dark:bg-brand-dark rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col"
        >
          <div className="relative h-56">
            <img
              alt={equipment.name}
              className="w-full h-full object-cover"
              src={equipment.image}
            />
            <span
              className={`absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 uppercase rounded-full shadow-lg ${
                equipment.status === 'newest'
                  ? 'bg-green-500'
                  : equipment.status === 'for-auction'
                    ? 'bg-blue-500'
                    : 'bg-slate-500'
              }`}
            >
              {equipment.status.replace('-', ' ')}
            </span>
          </div>
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white uppercase mb-4">
              {equipment.name}
            </h3>
            <div className="grid grid-cols-3 gap-4 text-[11px] mb-6">
              <div>
                <p className="text-slate-400 uppercase font-medium">Assembly Weight</p>
                <p className="font-bold text-slate-700 dark:text-slate-200">{equipment.weight}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-medium">Gross Power</p>
                <p className="font-bold text-slate-700 dark:text-slate-200">{equipment.power}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-medium">Max Speed</p>
                <p className="font-bold text-slate-700 dark:text-slate-200">{equipment.speed}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-medium">Engine</p>
                <p className="font-bold text-slate-700 dark:text-slate-200">{equipment.engine}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-medium">Hours</p>
                <p className="font-bold text-slate-700 dark:text-slate-200">{equipment.hours}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-medium">Location</p>
                <p className="font-bold text-slate-700 dark:text-slate-200">{equipment.location}</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Retail Price</p>
              <p className="text-xl font-bold text-primary">${equipment.price.toLocaleString()}</p>
            </div>
            <button className="bg-primary text-white text-xs font-bold px-5 py-2 rounded-3xl uppercase hover:bg-orange-600 transition-colors">
              View More
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* View More Button */}
  <div className="mt-16 text-center">
    <button className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase rounded-full hover:bg-[#1e293b] shadow-xl shadow-primary/20 transition-all group flex items-center gap-2 mx-auto">
      View Equipment's
      <i className="material-icons-outlined bg-white text-primary rounded-full p-1 text-md group-hover:translate-x-1 transition-transform">
        arrow_forward
      </i>
    </button>
  </div>
</section>
```

**Key Changes:**

- ✅ Uses `useFeaturedEquipment` hook
- ✅ Shows skeleton loaders during fetch
- ✅ Dynamically renders equipment from API
- ✅ Minimal code changes

---

### 7. Contact Form with Button Loading

**File:** `src/pages/public/ContactUsPage.tsx`

Example of form submission with loading state:

```typescript
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import { Button, Input } from '../../components';
import { showToast } from '../../utils/toast';
import { TopBanner, Header, Footer } from '../../components/layout';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  message: yup.string().required('Message is required').min(10, 'Message too short'),
});

const ContactUsPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  // ✅ Mutation for form submission
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await axiosInstance.post('/contact', data);
      return response.data;
    },
    onSuccess: () => {
      showToast.success('Message sent successfully! We\'ll get back to you soon.');
      reset(); // Reset form on success
    },
    onError: (error: Error) => {
      showToast.error(error.message ?? 'Failed to send message. Please try again.');
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <>
      <TopBanner />
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input {...register('name')} error={errors.name?.message} placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Input
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              {...register('message')}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="How can we help you?"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* ✅ Button with loading state */}
          <Button
            type="submit"
            isLoading={contactMutation.isPending}
            className="w-full"
            disabled={contactMutation.isPending}
          >
            {contactMutation.isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ContactUsPage;
```

**Key Features:**

- ✅ Button shows spinner during submission
- ✅ Button disabled during submission
- ✅ Form resets on success
- ✅ Toast notifications for feedback
- ✅ No manual loader management

---

## Common Scenarios

### 8. Debounced Search with Loader

```typescript
import { useState, useEffect } from 'react';
import { useEquipmentSearch } from '../../hooks/queries/useEquipment';
import { InlineSpinner } from '../../components';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [query]);

  // Search with debounced query
  const { data: results, isLoading } = useEquipmentSearch(debouncedQuery);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search equipment..."
        className="w-full px-4 py-2 pr-10 border rounded-lg"
      />

      {/* Show loader in input */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <InlineSpinner size="sm" />
        </div>
      )}

      {/* Search results dropdown */}
      {results && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg">
          {results.map((item) => (
            <div key={item.id} className="p-3 hover:bg-gray-50">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

---

### 9. Section Refresh with Overlay Loader

```typescript
import { useQuery } from '@tanstack/react-query';
import { SectionLoader } from '../../components';
import axiosInstance from '../../api/axiosInstance';

const DashboardStatsCard = () => {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/dashboard/stats');
      return response.data.data;
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  return (
    <div className="bg-white rounded-xl p-6 relative">
      {/* Refresh Button */}
      <button
        onClick={() => refetch()}
        disabled={isRefetching}
        className="absolute top-4 right-4"
      >
        <span className={`material-icons ${isRefetching ? 'animate-spin' : ''}`}>
          refresh
        </span>
      </button>

      {/* ✅ Section Loader with Overlay */}
      <SectionLoader isLoading={isRefetching} overlay={true}>
        {isLoading ? (
          <SkeletonText lines={3} />
        ) : (
          <div>
            <h3 className="text-xl font-bold">{data.title}</h3>
            <p className="text-3xl font-bold text-primary">{data.value}</p>
          </div>
        )}
      </SectionLoader>
    </div>
  );
};
```

---

### 10. Silent Background Operations

```typescript
// Analytics tracking - NO loader
export const trackEvent = async (event: string, data: any) => {
  try {
    await axiosInstance.post(
      '/analytics/event',
      { event, data },
      disableLoader(), // ❌ Silent
    );
  } catch (error) {
    // Fail silently
    console.error('Analytics error:', error);
  }
};

// Auto-save draft - NO loader
export const autoSaveDraft = async (content: string) => {
  try {
    await axiosInstance.post(
      '/drafts/auto-save',
      { content },
      disableLoader(), // ❌ Silent
    );
  } catch (error) {
    // Fail silently
  }
};

// Heartbeat - NO loader
export const sendHeartbeat = async () => {
  try {
    await axiosInstance.post(
      '/heartbeat',
      {},
      disableLoader(), // ❌ Silent
    );
  } catch (error) {
    // Fail silently
  }
};
```

---

## Summary

### ✅ What We've Implemented

1. **Foundation:**
   - ✅ Enabled API interceptor in `main.tsx`
   - ✅ Automatic loader tracking for all API calls

2. **API Configuration:**
   - ✅ Auth API with appropriate loader types
   - ✅ Equipment API (new) for data-driven pages
   - ✅ Silent operations (refresh, analytics)

3. **Pages with Loaders:**
   - ✅ BuyPage with skeleton loaders
   - ✅ HomePage with featured equipment loaders
   - ✅ ContactUsPage with form button loading

4. **Patterns:**
   - ✅ Skeleton loaders for lists
   - ✅ Button loading for forms
   - ✅ Section loaders for refreshing
   - ✅ Debounced search with inline spinner
   - ✅ Silent background operations

### 🎯 Next Steps

1. Apply same patterns to remaining pages
2. Create equipment detail page
3. Test all scenarios
4. Add error boundaries
5. Performance optimization

---

**Ready to implement! Copy and paste the code above.** 🚀
