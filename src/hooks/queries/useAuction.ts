// hooks/queries/auctionQueries.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  auctionApi,
  type AuctionListResponse,
  type FilterAuctionParams,
} from '../../api/auctionApi';
import type { Auction } from '../../types/home';

export const auctionKeys = {
  all: ['auctions'] as const,
  latest: () => [...auctionKeys.all, 'latest'] as const,
  list: (params: unknown) => [...auctionKeys.all, 'list', params] as const,
};

export const useLatestAuction = (): UseQueryResult<Auction, Error> => {
  return useQuery({
    queryKey: auctionKeys.latest(),
    queryFn: async (): Promise<Auction> => {
      const response = await auctionApi.getLatestAuction();
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch latest auction');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

//FILTERED AUCTIONS BASED ON TYPE UPCOMING PAST
export const useFilteredAuctions = (
  params: FilterAuctionParams = {},
): UseQueryResult<AuctionListResponse, Error> => {
  return useQuery({
    queryKey: auctionKeys.list(params),
    queryFn: async (): Promise<AuctionListResponse> => {
      const response = await auctionApi.getFilterAuctions(params);
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch auctions');
      }
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });
};
