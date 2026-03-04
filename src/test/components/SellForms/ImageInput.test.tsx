import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImageUpload } from '../../../components/SellForms/ImageInput';

// 1. Fixed Mock Translation to return the actual text your component uses
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'sell.form.conditionCheckList.imageUpload.clickHere': 'Click here',
        'sell.form.conditionCheckList.imageUpload.toUpload': 'to upload your file or drag.',
        'sell.form.conditionCheckList.imageUpload.formatSupport':
          'Supported Format: SVG, JPG, MP4 (10mb each)',
      };
      return translations[key] || key;
    },
  }),
}));

describe('ImageUpload', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.URL.createObjectURL = vi.fn(() => 'mock-url');
    window.URL.revokeObjectURL = vi.fn();
  });

  it('renders the drop zone with correct labels', () => {
    render(<ImageUpload label="Upload Photos" onChange={mockOnChange} />);

    expect(screen.getByText('Upload Photos')).toBeInTheDocument();
    // Use a regex to find the text even if split by <span> tags
    expect(screen.getByText(/Click here/i)).toBeInTheDocument();
  });

  it('handles file selection via input', async () => {
    render(<ImageUpload onChange={mockOnChange} />);

    const file = new File(['hello'], 'test.png', { type: 'image/png' });
    // Since the input is hidden, we select it by its type
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
      expect(screen.getByText('test.png')).toBeInTheDocument();
    });
  });

  it('handles drag and drop events', () => {
    render(<ImageUpload onChange={mockOnChange} />);
    // Find by the container text
    const dropZone = screen.getByText(/Click here/i).closest('.relative');

    fireEvent.dragEnter(dropZone!);
    expect(dropZone).toHaveClass('border-primary');

    const file = new File(['(⌐□_□)'], 'hello.png', { type: 'image/png' });
    fireEvent.drop(dropZone!, {
      dataTransfer: { files: [file] },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('shows error state when error prop is provided', () => {
    const errorMessage = 'Invalid file type';
    render(<ImageUpload error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    const dropZone = screen.getByText(/Click here/i).closest('.relative');
    expect(dropZone).toHaveClass('border-red-500');
  });
  it('accepts only video files when mode is set to video', async () => {
    render(<ImageUpload mode="video" onChange={mockOnChange} />);

    const imageFile = new File(['img'], 'test.png', { type: 'image/png' });
    const videoFile = new File(['vid'], 'test.mp4', { type: 'video/mp4' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    // Try to upload an image while in video mode
    fireEvent.change(input, { target: { files: [imageFile, videoFile] } });

    await waitFor(() => {
      // Should only have called onChange with the video file
      expect(mockOnChange).toHaveBeenCalledWith([videoFile]);
      expect(screen.queryByText('test.png')).not.toBeInTheDocument();
      expect(screen.getByText('test.mp4')).toBeInTheDocument();
    });
  });
  it('revokes the object URL when a preview is removed', async () => {
    render(<ImageUpload onChange={mockOnChange} />);
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    // Find and click the "X" button
    const removeButton = screen.getByLabelText('Remove preview');
    fireEvent.click(removeButton);

    expect(globalThis.URL.revokeObjectURL).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenLastCalledWith([]);
  });
  it('prevents interaction when disabled', () => {
    render(<ImageUpload disabled={true} onChange={mockOnChange} />);

    const dropZone = screen.getByText(/Click here/i).closest('div.relative');
    fireEvent.click(dropZone!);

    // The hidden input should be disabled
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(dropZone).toHaveClass('cursor-not-allowed', 'opacity-50');
  });
});
