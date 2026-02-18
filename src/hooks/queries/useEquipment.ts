import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  equipmentApi,
  type Equipment,
  type EquipmentListResponse,
  type EquipmentFilters,
  type EquipmentCategoryFilters,
  type EquipmentCategoryListResponse,
  equipmentCategoryApi,
} from '../../api/equipmentApi';

/**
 * Query keys for equipment data
 * Used for caching and invalidation
 */
export const equipmentKeys = {
  all: ['equipment'] as const,
  lists: () => [...equipmentKeys.all, 'list'] as const,
  list: (filters: EquipmentFilters) => [...equipmentKeys.lists(), filters] as const,
  details: () => [...equipmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...equipmentKeys.details(), id] as const,
  featured: () => [...equipmentKeys.all, 'featured'] as const,
  search: (query: string) => [...equipmentKeys.all, 'search', query] as const,
  latest: () => [...equipmentKeys.all, 'latest'] as const,
};

/**
 * Fetch equipment list with filters
 *
 * Features:
 * - Automatic loading state via isLoading
 * - Automatic error handling
 * - Caching with 5-minute stale time
 * - Refetch on window focus
 *
 * @example
 * const { data, isLoading, error } = useEquipmentList({ category: ['trucks'] });
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
 * Fetch single equipment details by ID
 *
 * Features:
 * - Only fetches when ID is provided (enabled: !!id)
 * - Longer stale time (10 minutes) for details
 * - Automatic caching
 *
 * @example
 * const { data, isLoading } = useEquipmentDetail(equipmentId);
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
 *
 * @example
 * const { data: featured, isLoading } = useFeaturedEquipment(3);
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
 * Search equipment by query string
 *
 * Features:
 * - Only searches when query is 2+ characters
 * - Shorter stale time for search results
 * - Debounce recommended at component level
 *
 * @example
 * const { data: results, isLoading } = useEquipmentSearch(searchQuery);
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

/**
 * Query keys for equipment categories
 */
export const equipmentCategoryKeys = {
  all: ['equipment-categories'] as const,
  lists: () => [...equipmentCategoryKeys.all, 'list'] as const,
  list: (filters: EquipmentCategoryFilters) => [...equipmentCategoryKeys.lists(), filters] as const,
};

/**
 * Fetch all equipment categories
 *
 * Features:
 * - Public (no auth)
 * - Cached for 10 minutes
 * - Automatic loading & error handling
 *
 * @example
 * const { data, isLoading } = useEquipmentCategories({ isActive: true });
 */
export const useEquipmentCategories = (
  filters: EquipmentCategoryFilters = {},
): UseQueryResult<EquipmentCategoryListResponse, Error> => {
  return useQuery({
    queryKey: equipmentCategoryKeys.list(filters),
    queryFn: async (): Promise<EquipmentCategoryListResponse> => {
      const response = await equipmentCategoryApi.getCategories(filters);

      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch categories');
      }

      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });
};

export const useLatestEquipment = (): UseQueryResult<Equipment[], Error> => {
  return useQuery({
    queryKey: equipmentKeys.latest(),
    queryFn: async (): Promise<Equipment[]> => {
      const response = await equipmentApi.getLatest();

      // if your API wraps response
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch latest equipment');
      }

      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
