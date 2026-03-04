import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BasicInfo from '../../../components/SellForms/BasicInfoForm';
import { type SellFormData } from '../../../types/home';

// 1. Mock the TinyMCE Editor to avoid heavy rendering and iframe issues
vi.mock('@tinymce/tinymce-react', () => ({
  Editor: ({ value, onEditorChange }: any) => (
    <textarea
      data-testid="mock-editor"
      value={value}
      onChange={(e) => onEditorChange(e.target.value)}
    />
  ),
}));

// Update the mock to return the actual string values used in the UI
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'sell.form.equipmentTitle': 'Equipment Title',
        'sell.form.category': 'Category',
        'sell.form.description': 'Description',
        'sell.form.basicEquipmentInformation': 'Basic Equipment Information',
      };
      return translations[key] || key;
    },
  }),
}));
describe('BasicInfo Component', () => {
  const mockSetFormData = vi.fn();
  const mockHandleChange = vi.fn();
  const mockSetErrors = vi.fn();

  const initialData: SellFormData = {
    title: '',
    category: '',
    description: '',
    // ... add other necessary fields from SellFormData
  } as SellFormData;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all basic input fields', () => {
    render(
      <BasicInfo
        formData={initialData}
        setFormData={mockSetFormData}
        handleChange={mockHandleChange}
        setErrors={mockSetErrors}
      />,
    );

    expect(screen.getByLabelText(/Equipment Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
  });

  it('updates title via handleChange', () => {
    render(
      <BasicInfo
        formData={initialData}
        setFormData={mockSetFormData}
        handleChange={mockHandleChange}
        setErrors={mockSetErrors}
      />,
    );

    const input = screen.getByPlaceholderText(/e.g., Caterpillar/i);
    fireEvent.change(input, { target: { value: 'New Excavator', name: 'title' } });

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('updates description and clears error when Editor content changes', async () => {
    render(
      <BasicInfo
        formData={initialData}
        setFormData={mockSetFormData}
        handleChange={mockHandleChange}
        setErrors={mockSetErrors}
      />,
    );

    const editor = screen.getByTestId('mock-editor');
    fireEvent.change(editor, { target: { value: 'Updated description' } });

    // Verify setFormData was called with the new content
    expect(mockSetFormData).toHaveBeenCalled();
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    expect(updaterFunction(initialData)).toEqual({
      ...initialData,
      description: 'Updated description',
    });

    // Verify setErrors was called to clear the description error
    expect(mockSetErrors).toHaveBeenCalled();
  });

  it('displays validation errors for title and description', () => {
    const errors = {
      title: 'Title is required',
      description: 'Description is too short',
    };

    render(
      <BasicInfo
        formData={initialData}
        setFormData={mockSetFormData}
        handleChange={mockHandleChange}
        errors={errors}
        setErrors={mockSetErrors}
      />,
    );

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is too short')).toBeInTheDocument();
  });
});
