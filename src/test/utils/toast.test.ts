import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { showToast, getErrorMessage } from '../../utils/toast';

type ToastMock = Mock & {
  success: Mock;
  error: Mock;
};
// Mock react-hot-toast
vi.mock('react-hot-toast', () => {
  // Create a callable function mock inside the factory
  const toastMock: ToastMock = (vi.fn() as unknown) as ToastMock;
  toastMock.success = vi.fn();
  toastMock.error = vi.fn();

  return {
    default: toastMock,
  };
});

import toastImport from 'react-hot-toast'; // import after mocking

describe('showToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast.success with correct message and default options', () => {
    const message = 'Success!';
    showToast.success(message);
    expect(toastImport.success).toHaveBeenCalledWith(message, {
      duration: 4000,
      position: 'top-right',
    });
  });

  it('calls toast.error with correct message and default options', () => {
    const message = 'Error!';
    showToast.error(message);
    expect(toastImport.error).toHaveBeenCalledWith(message, {
      duration: 5000,
      position: 'top-right',
    });
  });

  it('calls toast for warning with icon', () => {
    const message = 'Warning!';
    showToast.warning(message);
    expect(toastImport).toHaveBeenCalledWith(message, {
      icon: '⚠️',
      duration: 4000,
      position: 'top-right',
    });
  });

  it('calls toast for info with icon', () => {
    const message = 'Info!';
    showToast.info(message);
    expect(toastImport).toHaveBeenCalledWith(message, {
      icon: 'ℹ️',
      duration: 4000,
      position: 'top-right',
    });
  });

  it('merges custom options', () => {
    const message = 'Custom!';
    const options = { duration: 10000, position: 'bottom-left' } as const;
    showToast.success(message, options);
    expect(toastImport.success).toHaveBeenCalledWith(message, {
      duration: 10000,
      position: 'bottom-left',
    });
  });
});

describe('getErrorMessage', () => {
  it('returns message from Error instance', () => {
    const error = new Error('Error instance message');
    expect(getErrorMessage(error)).toBe('Error instance message');
  });

  it('returns message from object with response.data.message', () => {
    const error = { response: { data: { message: 'API error message' } } };
    expect(getErrorMessage(error)).toBe('API error message');
  });

  it('returns message from object with message property', () => {
    const error = { message: 'Simple object message' };
    expect(getErrorMessage(error)).toBe('Simple object message');
  });

  it('returns default message for object with no message', () => {
    const error = { foo: 'bar' };
    expect(getErrorMessage(error)).toBe('An unexpected error occurred. Please try again.');
  });

  it('returns default message for null', () => {
    expect(getErrorMessage(null)).toBe('An unexpected error occurred. Please try again.');
  });

  it('returns default message for undefined', () => {
    expect(getErrorMessage(undefined)).toBe('An unexpected error occurred. Please try again.');
  });

  it('returns default message for primitive types', () => {
    expect(getErrorMessage(123)).toBe('An unexpected error occurred. Please try again.');
    expect(getErrorMessage('oops')).toBe('An unexpected error occurred. Please try again.');
    expect(getErrorMessage(true)).toBe('An unexpected error occurred. Please try again.');
  });
});