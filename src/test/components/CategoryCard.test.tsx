import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CategoryCard } from '../../components/Home/CategoryCard';
import type { Category } from '../../types/home';

describe('CategoryCard', () => {
  const category: Category = {
    id: '1',
    title: 'Excavators',
    image: 'https://example.com/excavator.jpg',
  };

  it('renders the image with correct src and alt', () => {
    render(<CategoryCard category={category} />);

    const img = screen.getByAltText(category.title) as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toContain(category.image);
  });

  it('renders the title text', () => {
    render(<CategoryCard category={category} />);

    const title = screen.getByText(category.title);
    expect(title).toBeDefined();
  });
});
