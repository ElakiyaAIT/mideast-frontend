import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SuspenseFallback } from '../../components/SuspenseFallback';

describe('SuspenseFallback', () => {
  it('renders default loading message and fullScreen container', () => {
    render(<SuspenseFallback data-testid="suspense-fallback" />);

    // Default message
    expect(screen.getByText('Loading...')).toBeDefined();

    // Fullscreen container
    const container = screen.getByTestId('suspense-fallback');
    expect(container).toHaveClass(
      'fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900',
    );
  });

  it('renders custom message', () => {
    render(<SuspenseFallback message="Please wait..." data-testid="suspense-fallback" />);
    expect(screen.getByText('Please wait...')).toBeDefined();
  });

  it('renders correctly with fullScreen=false', () => {
    render(<SuspenseFallback fullScreen={false} data-testid="suspense-fallback" />);

    const container = screen.getByTestId('suspense-fallback');
    expect(container).toHaveClass('flex items-center justify-center min-h-[400px] bg-transparent');
    expect(container).not.toHaveClass('fixed inset-0');
  });

  it('renders loader elements', () => {
    render(<SuspenseFallback data-testid="suspense-fallback" />);

    // Check for animated elements
    expect(document.querySelector('.animate-spin-slow')).toBeDefined();
    expect(document.querySelector('.animate-pulse-slow')).toBeDefined();
    expect(document.querySelector('.animate-bounce')).toBeDefined();
  });
});
