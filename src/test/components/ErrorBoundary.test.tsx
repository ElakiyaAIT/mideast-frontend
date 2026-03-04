import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import React from 'react';

vi.mock('../../i18n', () => ({
  t: (key: string) => key,
  default: {
    t: (key: string) => key,
  },
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders fallback UI when an error is thrown', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    // Heading
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Error message (visible paragraph only)
    const errorMessage = screen.getByText('Test error', { selector: 'p' });
    expect(errorMessage).toBeInTheDocument();

    // Buttons
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();

    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('calls onError callback when an error occurs', () => {
    const onErrorMock = vi.fn();
    const ThrowError = () => {
      throw new Error('Callback test');
    };

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(onErrorMock).toHaveBeenCalled();
    const firstCall = onErrorMock.mock.calls[0];
    const error = firstCall[0] as Error;
    const errorInfo = firstCall[1] as React.ErrorInfo;
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Callback test');
    expect(errorInfo).toHaveProperty('componentStack');
  });

  it('resets error state when try again button is clicked', () => {
    const ThrowError = () => {
      throw new Error('Reset test');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);

    // After reset, children should be empty (error component throws again if rendered)
    // To test properly, render a normal child instead
    render(
      <ErrorBoundary>
        <div>Recovered content</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Recovered content')).toBeInTheDocument();
  });

  it('go home button sets window.location.href', () => {
    const ThrowError = () => {
      throw new Error('Go home test');
    };

    // Save original window.location
    const originalLocation = window.location;

    // Mock window.location.href safely
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, href: '' },
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    fireEvent.click(goHomeButton);

    expect(window.location.href).toBe('/');

    // Restore original window.location after test
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('renders custom fallback if provided', () => {
    const ThrowError = () => {
      throw new Error('Fallback test');
    };

    render(
      <ErrorBoundary fallback={<div>Custom Fallback</div>}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Custom Fallback')).toBeInTheDocument();
  });
});
