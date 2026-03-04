import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialCarousel from '../../components/Home/TestimonialCarousel';

// Mock i18n
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('TestimonialCarousel', () => {
  const testimonials = [
    {
      review: 'Excellent service!',
      name: 'John Doe',
      role: 'CEO',
      image: undefined,
    },
    {
      review: 'Great quality!',
      name: 'Jane Smith',
      role: 'Manager',
      image: 'https://example.com/jane.jpg',
    },
  ];

  const getAvatar = (name: string) => `https://example.com/avatar-${name}.jpg`;
  const formatText = (text: string) => text.toUpperCase();
  const quoteIcon = 'https://example.com/quote.png';

  it('renders title and subtitle', () => {
    render(
      <TestimonialCarousel
        testimonials={testimonials}
        quoteIcon={quoteIcon}
        getAvatar={getAvatar}
        formatText={formatText}
      />,
    );

    expect(screen.getByText('home.testimonials.title')).toBeDefined();
    expect(screen.getByText('home.testimonials.subtitle')).toBeDefined();
  });

  it('renders first testimonial initially', () => {
    render(
      <TestimonialCarousel
        testimonials={testimonials}
        quoteIcon={quoteIcon}
        getAvatar={getAvatar}
        formatText={formatText}
      />,
    );

    expect(screen.getByText(testimonials[0].review)).toBeDefined();
    expect(screen.getByText(formatText(testimonials[0].name))).toBeDefined();
    expect(screen.getByText(testimonials[0].role)).toBeDefined();

    const avatar = screen.getByAltText(`${testimonials[0].name} Profile`) as HTMLImageElement;
    expect(decodeURIComponent(avatar.src)).toContain('https://example.com/avatar-John Doe.jpg');
  });

  it('navigates to next testimonial when next button is clicked', () => {
    render(
      <TestimonialCarousel
        testimonials={testimonials}
        quoteIcon={quoteIcon}
        getAvatar={getAvatar}
        formatText={formatText}
      />,
    );

    const nextButtons = screen.getAllByText('home.testimonials.next');
    const nextButton = nextButtons[0].closest('button')!;
    fireEvent.click(nextButton);

    expect(screen.getByText(testimonials[1].review)).toBeDefined();
    expect(screen.getByText(formatText(testimonials[1].name))).toBeDefined();
    expect(screen.getByText(testimonials[1].role)).toBeDefined();

    const avatar = screen.getByAltText(`${testimonials[1].name} Profile`) as HTMLImageElement;
    expect(avatar.src).toContain(testimonials[1].image);
  });

  it('wraps around to last testimonial when prev button is clicked from first', () => {
    render(
      <TestimonialCarousel
        testimonials={testimonials}
        quoteIcon={quoteIcon}
        getAvatar={getAvatar}
        formatText={formatText}
      />,
    );

    const prevButtons = screen.getAllByText('home.testimonials.prev');
    const prevButton = prevButtons[0].closest('button')!;
    fireEvent.click(prevButton);

    // After clicking prev from first, should show last testimonial
    expect(screen.getByText(testimonials[1].review)).toBeDefined();
    expect(screen.getByText(formatText(testimonials[1].name))).toBeDefined();
  });

  it('returns null when no testimonials are provided', () => {
    const { container } = render(
      <TestimonialCarousel
        testimonials={[]}
        quoteIcon={quoteIcon}
        getAvatar={getAvatar}
        formatText={formatText}
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});
