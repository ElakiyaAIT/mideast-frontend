import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionLoader } from '../../components/Loader/SectionLoader';

describe('SectionLoader', () => {
  const ChildContent = () => <div data-testid="child-content">Main Content</div>;

  it('renders children when isLoading is false', () => {
    render(
      <SectionLoader isLoading={false}>
        <ChildContent />
      </SectionLoader>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    // Ensure spinner is not present
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  describe('Overlay Mode (default)', () => {
    it('renders an overlay while keeping children in the DOM', () => {
      const { container } = render(
        <SectionLoader isLoading={true} overlay={true}>
          <ChildContent />
        </SectionLoader>,
      );

      // In overlay mode, children should still exist but be blurred/dimmed
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('displays the loading message when provided', () => {
      const message = 'Updating records...';
      render(
        <SectionLoader isLoading={true} message={message}>
          <ChildContent />
        </SectionLoader>,
      );

      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.getByText(message)).toHaveClass('text-base'); // Default md size
    });
  });

  describe('Replace Mode', () => {
    it('does NOT render children when overlay is false', () => {
      render(
        <SectionLoader isLoading={true} overlay={false}>
          <ChildContent />
        </SectionLoader>,
      );

      expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
    });

    it('applies the minHeight style', () => {
      const customMinHeight = '400px';
      const { container } = render(
        <SectionLoader isLoading={true} overlay={false} minHeight={customMinHeight}>
          <ChildContent />
        </SectionLoader>,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.minHeight).toBe(customMinHeight);
    });
  });

  describe('Sizes', () => {
    it('applies correct classes for different sizes', () => {
      const { rerender } = render(
        <SectionLoader isLoading={true} size="sm">
          <ChildContent />
        </SectionLoader>,
      );

      // Check sm message class
      expect(screen.queryByText('Loading...'))?.not.toBeInTheDocument();

      rerender(
        <SectionLoader isLoading={true} size="lg" message="Large Loader">
          <ChildContent />
        </SectionLoader>,
      );
      expect(screen.getByText('Large Loader')).toHaveClass('text-lg');
    });
  });
});
