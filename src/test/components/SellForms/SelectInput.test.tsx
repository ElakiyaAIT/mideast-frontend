import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectInput } from '../../../components/SellForms/SelectInput';

describe('SelectInput', () => {
  const mockOptions = [
    { id: '1', value: 'Option 1' },
    { id: '2', value: 'Option 2' },
  ];

  const defaultProps = {
    label: 'Category',
    name: 'category',
    options: mockOptions,
    onChange: vi.fn(),
  };

  it('renders the label and placeholder correctly', () => {
    render(<SelectInput {...defaultProps} placeholder="Choose one" />);

    // This will fail unless you add id/htmlFor to the component!
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('calls onChange when a new option is selected', () => {
    render(<SelectInput {...defaultProps} />);

    // We use getByRole as a safe alternative to Label if id is missing
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '2' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('displays the error message and applies error styles', () => {
    render(<SelectInput {...defaultProps} error="Selection required" />);

    expect(screen.getByText('Selection required')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('data-error', 'true');
    expect(select).toHaveClass('border-red-500');
  });

  it('renders all options provided', () => {
    render(<SelectInput {...defaultProps} />);

    // Include hidden options in the search
    const options = screen.getAllByRole('option', { hidden: true });

    expect(options).toHaveLength(mockOptions.length + 1);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('shows asterisk when required is true', () => {
    render(<SelectInput {...defaultProps} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
