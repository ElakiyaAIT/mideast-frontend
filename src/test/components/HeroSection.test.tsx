import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../../components/Home/HeroSection';

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toContain('QUALITY, USED HEAVY');
    expect(heading.textContent).toContain('EQUIPMENT');
    expect(heading.textContent).toContain('FOR SALE');
  });

  it('renders the description paragraph', () => {
    render(<HeroSection />);
    const paragraph = screen.getByText(/Since 2004, Mideast Equipment Supply/i);
    expect(paragraph).toBeDefined();
  });

  it('renders the image with correct src and alt', () => {
    render(<HeroSection />);
    const image = screen.getByAltText('Heavy Machinery') as HTMLImageElement;
    expect(image).toBeDefined();
    expect(decodeURIComponent(image.src)).toContain(
      '/images/heavy-machinery-used-construction-industry-engineering 3.png',
    );
  });
});
