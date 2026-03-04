import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuctionCard } from '../../components/Home/AuctionCard';
import type { Auction } from '../../types/home';

// Mock i18n
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // return key as text
  }),
}));

describe('AuctionCard', () => {
  const auction: Auction = {
    title: 'Heavy Equipment Auction',
    date: '2026-03-10',
    time: '10:00 AM',
    location: { _id: '1', state: 'California', city: '', address: '' },
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ],
    startDate: new Date().toISOString(),
  };

  it('renders title and images correctly', () => {
    render(<AuctionCard auction={auction} />);

    // Title
    expect(screen.getByText(auction.title)).toBeDefined();

    // Images
    const images = screen.getAllByAltText('Auction equipment') as HTMLImageElement[];
    expect(images.length).toBe(auction.images.length);

    images.forEach((image, index) => {
      expect(image).toBeDefined();
      expect(image.src).toContain(auction.images[index]);
    });
  });

  it('renders date, time, and location', () => {
    render(<AuctionCard auction={auction} />);

    expect(screen.getByText(auction.date)).toBeDefined();
    expect(screen.getByText(auction.time)).toBeDefined();
    expect(screen.getByText(auction.location.state!)).toBeDefined();
  });

  it('renders bidding buttons with translated text', () => {
    render(<AuctionCard auction={auction} />);

    expect(screen.getByText('home.auctions.proxibidBidding')).toBeDefined();
    expect(screen.getByText('home.auctions.equipmentfactsBidding')).toBeDefined();
  });
});
