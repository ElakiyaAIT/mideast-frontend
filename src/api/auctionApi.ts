// api/auctionApi.ts

import type { ApiResponse } from "../dto";
import type { Auction, NewAuction } from "../types/home";
import axiosInstance from "./axiosInstance";

export interface FilterAuctionParams {
  type?: string;
  startDate?: string;
  location?: string;
  auctionName?: string;
  page?: number;
  limit?: number;
}

export interface AuctionListResponse {
  items: NewAuction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const auctionApi = {
  getLatestAuction: async (): Promise<ApiResponse<Auction>> => {
    const response = await axiosInstance.get<ApiResponse<Auction>>(
      '/auctions/latest',
    );
    return response.data;
  },
  getFilterAuctions: async(
    params: FilterAuctionParams,
  ): Promise<ApiResponse<AuctionListResponse>>=>{
    const response=await axiosInstance.get<ApiResponse<AuctionListResponse>>(
      '/auctions',
      {params},
    );
    return response.data;
  }
};
