import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { dashboardApi } from '../../api';
import type { DashboardStatsDto, DashboardWidgetDto } from '../../dto';

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  widgets: () => [...dashboardKeys.all, 'widgets'] as const,
};

/**
 * Get dashboard stats
 */
export const useDashboardStats = (): UseQueryResult<DashboardStatsDto, Error> => {
  return useQuery<DashboardStatsDto, Error>({
    queryKey: dashboardKeys.stats(),
    queryFn: async (): Promise<DashboardStatsDto> => {
      const response = await dashboardApi.getStats();
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch dashboard stats');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

/**
 * Get dashboard widgets
 */
export const useDashboardWidgets = (): UseQueryResult<DashboardWidgetDto[], Error> => {
  return useQuery<DashboardWidgetDto[], Error>({
    queryKey: dashboardKeys.widgets(),
    queryFn: async (): Promise<DashboardWidgetDto[]> => {
      const response = await dashboardApi.getWidgets();
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch dashboard widgets');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
