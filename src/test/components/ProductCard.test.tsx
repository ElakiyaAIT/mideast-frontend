import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard, type Equipment } from '../../components/Home/ProductCard';
import { ROUTES } from '../../constants';

// Mock react-router-dom useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock i18n translation
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ProductCard', () => {
  const product: Equipment = {
    _id: '123',
    title: 'Excavator 3000',
    buyNowPrice: 250000,
    images: ['https://example.com/excavator.jpg'],
    hoursUsed: 1200,
    year: 2018,
    condition: 'Used',
    location: { city: 'Los Angeles' },
  };

  it('renders image with correct src and alt', () => {
    render(<ProductCard product={product} />);

    const image = screen.getByAltText(product.title) as HTMLImageElement;
    expect(image).toBeDefined();
    expect(image.src).toContain(product.images[0]);
  });

  it('renders title and specs', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText(product.title)).toBeDefined();
    expect(screen.getByText(product.hoursUsed!.toLocaleString())).toBeDefined();
    expect(screen.getByText(product.location.city)).toBeDefined();
  });

  it('renders translation texts and price', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('home.products.best')).toBeDefined();
    expect(screen.getByText('home.products.retailPrice')).toBeDefined();
    expect(screen.getByText(`$${product.buyNowPrice!.toLocaleString()}`)).toBeDefined();
    expect(screen.getByText('home.products.viewMore')).toBeDefined();
  });

  it('calls navigate with correct URL on button click', () => {
    render(<ProductCard product={product} />);

    const button = screen.getByText('home.products.viewMore');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.BUY}/${product._id}`);
  });
});
