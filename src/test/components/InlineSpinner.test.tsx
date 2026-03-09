import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InlineSpinner } from '../../components/Loader/InlineSpinner';

describe('InlineSpinner', () => {
  it('renders correctly with default props', () => {
    render(<InlineSpinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();

    // Check for default size (md) and variant (primary) classes
    expect(spinner).toHaveClass('h-5', 'w-5', 'border-t-primary-500');

    // Check accessibility label
    expect(screen.getByText('Loading')).toHaveClass('sr-only');
  });

  it('applies the correct size classes', () => {
    const { rerender } = render(<InlineSpinner size="xs" />);
    expect(screen.getByRole('status')).toHaveClass('h-3', 'w-3');

    rerender(<InlineSpinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('h-6', 'w-6');
  });

  it('applies the correct variant classes', () => {
    const { rerender } = render(<InlineSpinner variant="white" />);
    expect(screen.getByRole('status')).toHaveClass('border-t-white');

    rerender(<InlineSpinner variant="secondary" />);
    expect(screen.getByRole('status')).toHaveClass('border-t-gray-700');
  });

  it('uses a custom accessible label', () => {
    const customLabel = 'Fetching data...';
    render(<InlineSpinner label={customLabel} />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', customLabel);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  it('merges custom classNames correctly', () => {
    render(<InlineSpinner className="custom-test-class mt-4" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('mt-4', 'custom-test-class');
    // Ensure it still keeps the base animation class
    expect(spinner).toHaveClass('animate-spin');
  });

  it('is accessible', () => {
    render(<InlineSpinner />);
    const spinner = screen.getByRole('status');

    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });
});
