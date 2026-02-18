import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../dto';

/**
 * Equipment data structure - matches backend schema
 */
export interface Equipment {
  _id: string;
  title: string;
  description: string;
  categoryId: {
    _id: string;
    name: string;
  };
  sellerId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  listingType: 'buy_now' | 'auction' | 'both';
  buyNowPrice?: number;
  reservePrice?: number;
  status: string;
  make: string;
  models: string;
  year: number;
  serialNumber?: string;
  hoursUsed?: number;
  condition?: string;
  attributes?: Record<string, string>;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  videos?: string[];
  documents?: { name: string; url: string }[];
  isFeatured: boolean;
  isPublished: boolean;
  viewCount: number;
  inquiryCount: number;
  createdAt: string;
  updatedAt: string;
  fuelType: string;
  transmission: string;
  enginePower: string;
}

/**
 * Equipment filter options
 */
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

/**
 * Equipment list response with pagination
 */
export interface EquipmentListResponse {
  items: Equipment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Equipment Category data structure
 * Matches backend schema
 */
export interface EquipmentCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: {
    _id: string;
    name: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Equipment Category filter options
 */
export interface EquipmentCategoryFilters {
  page?: number;
  limit?: number;
  parentId?: string;
  isActive?: boolean;
}

/**
 * Equipment Category list response with pagination
 */
export interface EquipmentCategoryListResponse {
  items: EquipmentCategory[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Equipment API endpoints
 * All use SCOPED loader (default) - doesn't block UI
 */
export const equipmentApi = {
  /**
   * Get equipment list with filters
   * Uses SCOPED loader (default)
   */
  getEquipment: async (
    filters: EquipmentFilters = {},
  ): Promise<ApiResponse<EquipmentListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<EquipmentListResponse>>('/equipment', {
      params: filters,
    });
    return response.data;
  },
  /** *
   * Get latest equipment
   * */
  getLatest: async (): Promise<ApiResponse<Equipment[]>> => {
    const response = await axiosInstance.get<ApiResponse<Equipment[]>>('/equipment/latest');
    return response.data;
  },

  /**
   * Get single equipment details by ID
   * Uses SCOPED loader (default)
   */
  getEquipmentById: async (id: string): Promise<ApiResponse<Equipment>> => {
    const response = await axiosInstance.get(`/equipment/${id}`);
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
   * Search equipment by query
   * Uses SCOPED loader (default)
   */
  searchEquipment: async (query: string): Promise<ApiResponse<Equipment[]>> => {
    const response = await axiosInstance.get<ApiResponse<Equipment[]>>('/equipment/search', {
      params: { q: query },
    });
    return response.data;
  },
};

/**
 * Equipment Category API endpoints
 * Public endpoints – uses SCOPED loader (default)
 */
export const equipmentCategoryApi = {
  /**
   * Get all equipment categories
   * Supports pagination & filters
   */
  getCategories: async (
    filters: EquipmentCategoryFilters = {},
  ): Promise<ApiResponse<EquipmentCategoryListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<EquipmentCategoryListResponse>>(
      '/equipment-categories',
      {
        params: filters,
      },
    );

    return response.data;
  },
};
