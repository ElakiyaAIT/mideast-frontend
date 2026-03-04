// src/test/components/Input.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../../components/Input';
import React from 'react';

describe('Input', () => {
  it('renders the label correctly', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeDefined();
  });

  it('renders the error message correctly', () => {
    render(<Input error="Required field" />);
    expect(screen.getByText('Required field')).toBeDefined();
  });

  it('renders input with passed props', () => {
    render(<Input placeholder="Enter name" type="text" />);
    const input = screen.getByPlaceholderText('Enter name') as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.type).toBe('text');
  });

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Name" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Name') as HTMLInputElement;

    await userEvent.type(input, 'John');
    expect(handleChange).toHaveBeenCalled();
    expect(input.value).toBe('John');
  });

  it('supports forwarding refs', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe('Ref Test');
  });
});
