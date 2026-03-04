import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/Card/EquipmentCard';
import defaultImage from '../../assets/images/Dump Truck.png';
import type { Equipment } from '../../api/equipmentApi';

// Mock react-router-dom useNavigate
const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

// Mock i18n useTranslation
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // just return the key for testing
  }),
}));

const mockProduct: Equipment = {
  _id: '1',
  title: 'Test Truck',
  description: '',
  categoryId: { _id: '', name: '' },
  sellerId: { _id: '', firstName: '', lastName: '', email: '' },
  status: '',
  make: 'CAT',
  models: '320D',
  year: 2020,
  condition: 'used',
  hoursUsed: 1200,
  location: { state: 'California', city: '', country: '', address: '', zipCode: '' },
  buyNowPrice: 50000,
  listingType: 'buy_now',
  images: ['image1.png'],
  viewCount: 0,
  inquiryCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  fuelType: '',
  transmission: '',
  enginePower: '',
  isPublished: true,
  isFeatured: true,
};

describe('ProductCard component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
  });

  it('renders product title, make, model, year, condition, hours, and location', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Truck')).toBeInTheDocument();
    expect(screen.getByText('CAT')).toBeInTheDocument();
    expect(screen.getByText('320D')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('used')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();
    expect(screen.getByText('California')).toBeInTheDocument();
  });

  it('renders the badge with correct text and class for listingType', () => {
    render(<ProductCard product={mockProduct} />);
    const badge = screen.getByText('product.status.forSale');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-orange-400');
  });

  it('renders default image when no images are provided', () => {
    const productWithoutImages = { ...mockProduct, images: [] };
    render(<ProductCard product={productWithoutImages} />);
    const img = screen.getByAltText('Test Truck') as HTMLImageElement;
    expect(img.src).toContain(defaultImage);
  });

  it('calls navigate when View More button is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    const button = screen.getByText('product.viewMore');
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith('/buy/1');
  });
  it('displays price correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$50,000')).toBeInTheDocument();
  });

  it('handles missing buyNowPrice gracefully', () => {
    const productWithoutPrice = { ...mockProduct, buyNowPrice: undefined };
    render(<ProductCard product={productWithoutPrice} />);
    const price = screen.getByText((content) => content.includes('-'));
    expect(price).toBeInTheDocument();
  });
});
