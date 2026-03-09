import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RadioGroup from '../../../components/SellForms/RadioInput';

describe('RadioGroup', () => {
  const mockOptions = [
    { id: 1, value: 'small', label: 'Small size' },
    { id: 2, value: 'large', label: 'Large size' },
  ];

  const defaultProps = {
    label: 'Select Size',
    name: 'size',
    value: 'small',
    options: mockOptions,
    onChange: vi.fn(),
  };

  it('renders the group label and all options', () => {
    render(<RadioGroup {...defaultProps} />);

    expect(screen.getByText('Select Size')).toBeInTheDocument();
    // formatLabel converts "small size" to "Small Size"
    expect(screen.getByLabelText('Small Size')).toBeInTheDocument();
    expect(screen.getByLabelText('Large Size')).toBeInTheDocument();
  });

  it('marks the correct radio button as checked based on value prop', () => {
    render(<RadioGroup {...defaultProps} value="large" />);

    const smallRadio = screen.getByLabelText('Small Size') as HTMLInputElement;
    const largeRadio = screen.getByLabelText('Large Size') as HTMLInputElement;

    expect(smallRadio.checked).toBe(false);
    expect(largeRadio.checked).toBe(true);
  });

  it('calls onChange when a different option is clicked', () => {
    render(<RadioGroup {...defaultProps} />);

    const largeRadio = screen.getByLabelText('Large Size');
    fireEvent.click(largeRadio);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when provided', () => {
    render(<RadioGroup {...defaultProps} error="Please select an option" />);

    expect(screen.getByText('Please select an option')).toBeInTheDocument();

    // Check if data-error attribute is set on inputs
    const inputs = screen.getAllByRole('radio');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('data-error', 'true');
    });
  });

  it('applies formatting to labels correctly', () => {
    const options = [{ id: 1, value: 'low_stock', label: 'low stock' }];
    render(<RadioGroup {...defaultProps} options={options} />);

    // formatLabel logic: 'low stock' -> 'Low Stock'
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
  });
});
