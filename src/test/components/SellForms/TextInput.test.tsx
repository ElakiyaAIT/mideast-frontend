import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { TextInput } from '../../../components/SellForms/TextInput';

describe('TextInput', () => {
  it('renders the input and label correctly', () => {
    render(<TextInput label="Email Address" placeholder="Enter your email" />);

    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('shows the required asterisk when required is true', () => {
    render(<TextInput label="Username" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('updates value correctly on change', () => {
    render(<TextInput label="Input" data-testid="test-input" />);
    const input = screen.getByLabelText('Input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Hello World' } });
    expect(input.value).toBe('Hello World');
  });

  it('displays error message and applies error styles', () => {
    const errorMessage = 'This field is required';
    render(<TextInput label="Input" error={errorMessage} />);

    const errorText = screen.getByText(errorMessage);
    const input = screen.getByLabelText('Input');

    expect(errorText).toBeInTheDocument();
    expect(input).toHaveClass('border-red-500');
    expect(input).toHaveAttribute('data-error', 'true');
  });

  it('forwards the ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextInput label="Ref Input" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('passes standard HTML attributes to the input element', () => {
    render(<TextInput label="Password" type="password" autoComplete="current-password" disabled />);

    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('autoComplete', 'current-password');
    expect(input).toBeDisabled();
  });
});
