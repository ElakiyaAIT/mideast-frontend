import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  SkeletonLoader,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from '../../components/Loader/SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders a single skeleton item by default', () => {
    const { container } = render(<SkeletonLoader variant="text" />);
    // SkeletonItem has 'relative overflow-hidden'
    const item = container.querySelector('.relative.overflow-hidden');
    expect(item).toBeInTheDocument();
  });

  it('renders the correct number of items based on count', () => {
    const count = 5;
    const { container } = render(<SkeletonLoader variant="text" count={count} />);

    // The wrapper for multiple items has 'space-y-3'
    const wrapper = container.querySelector('.space-y-3');
    expect(wrapper).toBeInTheDocument();

    // Count the actual skeleton blocks
    const items = container.querySelectorAll('.relative.overflow-hidden');
    expect(items).toHaveLength(count);
  });

  it('applies specific styles for the circle variant', () => {
    const { container } = render(<SkeletonLoader variant="circle" />);
    const item = container.querySelector('.rounded-full') as HTMLElement;

    expect(item).toBeInTheDocument();
    expect(item.style.width).toBe('48px');
    expect(item.style.height).toBe('48px');
  });

  it('renders the complex card variant structure', () => {
    const { container } = render(<SkeletonLoader variant="card" />);

    // Check for the nested skeleton elements inside the card
    const avatarPlaceholder = container.querySelector('.h-12.w-12.rounded-full');
    const footerButtons = container.querySelectorAll('.h-8.w-20');

    expect(avatarPlaceholder).toBeInTheDocument();
    expect(footerButtons).toHaveLength(2);
  });

  it('applies the correct animation speed classes', () => {
    const { rerender, container } = render(<SkeletonLoader speed="slow" />);
    expect(container.querySelector('.before\\:animate-shimmer-slow')).toBeInTheDocument();

    rerender(<SkeletonLoader speed="fast" />);
    expect(container.querySelector('.before\\:animate-shimmer-fast')).toBeInTheDocument();
  });

  describe('Helper Components', () => {
    it('SkeletonText renders requested number of lines', () => {
      const { container } = render(<SkeletonText lines={4} />);
      const items = container.querySelectorAll('.h-4.rounded');
      expect(items).toHaveLength(4);
    });

    it('SkeletonAvatar applies custom size', () => {
      const { container } = render(<SkeletonAvatar size="100px" />);
      const item = container.querySelector('.rounded-full') as HTMLElement;
      expect(item.style.width).toBe('100px');
    });

    it('SkeletonCard renders as a card variant', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.querySelector('.rounded-xl.p-4')).toBeInTheDocument();
    });
  });
});
