import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  equipmentApi,
  equipmentCategoryApi,
  type Equipment,
  type EquipmentListResponse,
  type EquipmentCategoryListResponse,
} from '../../api/equipmentApi';

// Mock axios instance
const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));
vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: mockGet,
  },
}));

describe('equipmentApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEquipment', () => {
    it('should fetch equipment list with filters', async () => {
      const mockResponse: EquipmentListResponse = {
        items: [
          {
            _id: 'eq1',
            title: 'Excavator',
            description: 'Heavy equipment',
            listingType: 'auction',
            categoryId: { _id: 'cat1', name: 'Heavy' },
            sellerId: {
              _id: 'seller1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@test.com',
            },
            status: 'available',
            make: 'CAT',
            models: '320',
            year: 2020,
            location: {
              address: '123 Main St',
              city: 'NYC',
              state: 'NY',
              zipCode: '10001',
              country: 'USA',
            },
            images: ['img1.jpg'],
            isFeatured: true,
            isPublished: true,
            viewCount: 100,
            inquiryCount: 10,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z',
            fuelType: 'Diesel',
            transmission: 'Automatic',
            enginePower: '200HP',
          },
        ],
        pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Success' },
      });

      const result = await equipmentApi.getEquipment({ category: ['Heavy'], page: 1 });

      expect(mockGet).toHaveBeenCalledWith('/equipment', {
        params: { category: ['Heavy'], page: 1 },
      });
      expect(result.success).toBe(true);
      expect(result.data.items).toHaveLength(1);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(equipmentApi.getEquipment()).rejects.toThrow('Network error');
    });
  });

  describe('getLatest', () => {
    it('should fetch latest equipment', async () => {
      const mockEquipment: Equipment = {
        _id: 'eq1',
        title: 'Latest Excavator',
        description: 'New model',
        listingType: 'auction',
        categoryId: { _id: 'cat1', name: 'Heavy' },
        sellerId: { _id: 'seller1', firstName: 'John', lastName: 'Doe', email: 'john@test.com' },
        status: 'available',
        make: 'CAT',
        models: '320',
        year: 2024,
        location: {
          address: '123 Main St',
          city: 'NYC',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        images: ['img1.jpg'],
        isFeatured: true,
        isPublished: true,
        viewCount: 100,
        inquiryCount: 10,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        enginePower: '200HP',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: [mockEquipment], message: 'Success' },
      });

      const result = await equipmentApi.getLatest();

      expect(mockGet).toHaveBeenCalledWith('/equipment/latest');
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getEquipmentById', () => {
    it('should fetch equipment by ID', async () => {
      const mockEquipment: Equipment = {
        _id: 'eq1',
        title: 'Excavator',
        description: 'Heavy equipment',
        listingType: 'auction',
        categoryId: { _id: 'cat1', name: 'Heavy' },
        sellerId: { _id: 'seller1', firstName: 'John', lastName: 'Doe', email: 'john@test.com' },
        status: 'available',
        make: 'CAT',
        models: '320',
        year: 2020,
        location: {
          address: '123 Main St',
          city: 'NYC',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        images: ['img1.jpg'],
        isFeatured: true,
        isPublished: true,
        viewCount: 100,
        inquiryCount: 10,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        enginePower: '200HP',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockEquipment, message: 'Success' },
      });

      const result = await equipmentApi.getEquipmentById('eq1');

      expect(mockGet).toHaveBeenCalledWith('/equipment/eq1');
      expect(result.success).toBe(true);
      expect(result.data._id).toBe('eq1');
    });
  });

  describe('getFeaturedEquipment', () => {
    it('should fetch featured equipment with limit', async () => {
      const mockEquipment: Equipment = {
        _id: 'eq1',
        title: 'Featured Excavator',
        description: 'Featured',
        listingType: 'auction',
        categoryId: { _id: 'cat1', name: 'Heavy' },
        sellerId: { _id: 'seller1', firstName: 'John', lastName: 'Doe', email: 'john@test.com' },
        status: 'available',
        make: 'CAT',
        models: '320',
        year: 2020,
        location: {
          address: '123 Main St',
          city: 'NYC',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        images: ['img1.jpg'],
        isFeatured: true,
        isPublished: true,
        viewCount: 100,
        inquiryCount: 10,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        enginePower: '200HP',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: [mockEquipment], message: 'Success' },
      });

      const result = await equipmentApi.getFeaturedEquipment(3);

      expect(mockGet).toHaveBeenCalledWith('/equipment/featured', { params: { limit: 3 } });
      expect(result.success).toBe(true);
    });
  });

  describe('searchEquipment', () => {
    it('should search equipment by query', async () => {
      const mockEquipment: Equipment = {
        _id: 'eq1',
        title: 'Excavator',
        description: 'Heavy equipment',
        listingType: 'auction',
        categoryId: { _id: 'cat1', name: 'Heavy' },
        sellerId: { _id: 'seller1', firstName: 'John', lastName: 'Doe', email: 'john@test.com' },
        status: 'available',
        make: 'CAT',
        models: '320',
        year: 2020,
        location: {
          address: '123 Main St',
          city: 'NYC',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        images: ['img1.jpg'],
        isFeatured: true,
        isPublished: true,
        viewCount: 100,
        inquiryCount: 10,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        enginePower: '200HP',
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: [mockEquipment], message: 'Success' },
      });

      const result = await equipmentApi.searchEquipment('Excavator');

      expect(mockGet).toHaveBeenCalledWith('/equipment/search', {
        params: { q: 'Excavator' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('getRelatedByCategory', () => {
    it('should fetch related equipment by category', async () => {
      const mockResponse: EquipmentListResponse = {
        items: [],
        pagination: { total: 0, page: 1, limit: 3, totalPages: 0 },
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Success' },
      });

      const result = await equipmentApi.getRelatedByCategory('cat1', 1, 3);

      expect(mockGet).toHaveBeenCalledWith('/equipment/cat1/related', {
        params: { page: 1, limit: 3 },
      });
      expect(result.success).toBe(true);
    });
  });
});

describe('equipmentCategoryApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should fetch equipment categories', async () => {
      const mockResponse: EquipmentCategoryListResponse = {
        items: [
          {
            _id: 'cat1',
            name: 'Heavy Equipment',
            slug: 'heavy-equipment',
            isActive: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z',
          },
        ],
        pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };

      mockGet.mockResolvedValueOnce({
        data: { success: true, data: mockResponse, message: 'Success' },
      });

      const result = await equipmentCategoryApi.getCategories({});

      expect(mockGet).toHaveBeenCalledWith('/equipment-categories', { params: {} });
      expect(result.success).toBe(true);
      expect(result.data.items).toHaveLength(1);
    });

    it('should handle API error', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(equipmentCategoryApi.getCategories()).rejects.toThrow('Network error');
    });
  });
});
