import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DocumentUpload } from '../../../components/SellForms/DocumentInput';

// Mock Translation
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // For simplicity, returning the key
  }),
}));

describe('DocumentUpload', () => {
  const mockOnChange = vi.fn();
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the drop zone and label correctly', () => {
    render(<DocumentUpload label="Verify Identity" required />);

    expect(screen.getByText(/Verify Identity/i)).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText(/Click here/i)).toBeInTheDocument();
  });

  it('handles valid document uploads via input', async () => {
    render(<DocumentUpload onChange={mockOnChange} />);

    const file = new File(['content'], 'resume.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([file]);
      expect(screen.getByText('resume.pdf')).toBeInTheDocument();
    });
  });

  it('filters out invalid file types', async () => {
    render(<DocumentUpload onChange={mockOnChange} />);

    const invalidFile = new File(['image'], 'selfie.png', { type: 'image/png' });
    const validFile = new File(['doc'], 'contract.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [invalidFile, validFile] } });

    await waitFor(() => {
      // Should only contain the docx file
      expect(mockOnChange).toHaveBeenCalledWith([validFile]);
      expect(screen.queryByText('selfie.png')).not.toBeInTheDocument();
      expect(screen.getByText('contract.docx')).toBeInTheDocument();
    });
  });

  it('handles file removal', async () => {
    render(<DocumentUpload onChange={mockOnChange} onRemove={mockOnRemove} />);

    const file = new File(['content'], 'data.xls', { type: 'application/vnd.ms-excel' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    // Find the 'X' button inside the file list item
    const removeBtn = await screen.findByRole('button');
    fireEvent.click(removeBtn);

    expect(mockOnChange).toHaveBeenLastCalledWith([]);
    expect(mockOnRemove).toHaveBeenCalledWith(0);
    expect(screen.queryByText('data.xls')).not.toBeInTheDocument();
  });

  it('prevents interaction and shows disabled state', () => {
    render(<DocumentUpload disabled label="Locked Upload" />);

    const dropZone = screen.getByText(/Click here/i).closest('.relative');
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    expect(input).toBeDisabled();
    expect(dropZone).toHaveClass('cursor-not-allowed', 'opacity-50');

    fireEvent.click(dropZone!);
    // Input should not be triggered (indirectly verified by disabled attribute)
  });

  it('shows error state correctly', () => {
    const errorMsg = 'Files too large';
    render(<DocumentUpload error={errorMsg} />);

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    const dropZone = screen.getByText(/Click here/i).closest('.relative');
    expect(dropZone).toHaveClass('border-red-500');
  });
});
