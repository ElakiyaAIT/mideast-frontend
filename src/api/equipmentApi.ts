import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../dto';
import type { SellFormData } from '../types/home';

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
   * Create new equipment listing
   */
  createEquipment: async (data: SellFormData): Promise<ApiResponse<EquipmentListResponse>> => {
    const response = await axiosInstance.post<ApiResponse<EquipmentListResponse>>(
      '/equipment',
      data,
    );
    return response.data;
  },
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
  //Upload images in forms
  uploadExteriorImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/exterior-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  //Engine
  //Upload images in forms
  uploadEngineImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/engine-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
  //hydraulics
  //Upload images in forms
  uploadHydraulicsImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/hydraulics-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
  //underCarriage
  //Upload images in forms
  uploadUnderCarriageImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/underCarriage-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
  //functionalTest
  //Upload images in forms
  uploadFunctionalImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/functional-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Exterior
  uploadExteriorMediaImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/exteriorMedia-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Engine
  //Upload images in forms
  uploadEngineMediaImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/engineMedia-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //UnderCarriage
  //Upload images in forms
  uploadUndercarriageMediaImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/underCarriageMedia-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //cabInterior
  //Upload images in forms
  uploadCabInteriorMediaImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/cabInteriorMedia-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //other attachments
  //Upload images in forms
  uploadOtherAttachmentMediaImage: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('images', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/otherMedia-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Upload videos in forms
  uploadVideos: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('videos', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Upload Documents in forms
  //Ownership
  uploadOwnershipDocs: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('documents', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/ownership-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Invoice/Bill of sale
  uploadInvoiceDocs: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('documents', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/invoice-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Government Registration
  uploadRegistrationDocs: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('documents', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/registration-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Emission Test
  uploadEmissionDocs: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('documents', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/emissionTest-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Insurance
  uploadInsuranceDocs: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('documents', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/insurance-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  //Maintenance
  //Insurance
  uploadMaintenanceDocs: async (file: File): Promise<{ data: { urls: string[] } }> => {
    const formData = new FormData();

    formData.append('documents', file); // MUST match FileInterceptor('image')

    const response = await axiosInstance.post('/admin/upload/maintenance-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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

  /**
   * Get related equipment by category
   * Supports pagination, default limit is 3
   */
  getRelatedByCategory: async (
    id: string,
    page: number = 1,
    limit: number = 3,
  ): Promise<ApiResponse<EquipmentListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<EquipmentListResponse>>(
      `/equipment/${id}/related`,
      {
        params: { page, limit },
      },
    );
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
