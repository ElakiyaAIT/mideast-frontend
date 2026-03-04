import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConditionPill } from '../../../components/SellForms/StatusChip';

describe('ConditionPill', () => {
  it('renders the label correctly', () => {
    render(<ConditionPill label="Battery Health" status="good" />);
    expect(screen.getByText('Battery Health')).toBeInTheDocument();
  });

  it('applies "good" status styles and icon', () => {
    const { container } = render(<ConditionPill label="Excellent" status="good" />);

    // Check wrapper classes
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('bg-green-100', 'text-green-700');

    // Check icon content
    expect(screen.getByText('check')).toBeInTheDocument();
    expect(screen.getByText('check').parentElement).toHaveClass('bg-green-500');
  });

  it('applies "fair" status styles and icon', () => {
    render(<ConditionPill label="Needs Attention" status="fair" />);

    const pill = screen.getByText('Needs Attention');
    expect(pill).toHaveClass('bg-yellow-100', 'text-yellow-700');
  });

  it('applies "bad" status styles and icon', () => {
    render(<ConditionPill label="Broken" status="bad" />);

    // Find the pill by its text content
    const pill = screen.getByText('Broken');

    // Verify the classes on the wrapper
    expect(pill).toHaveClass('bg-red-100');
    expect(pill).toHaveClass('text-red-700');

    // Verify the icon is present
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  it('maintains layout classes regardless of status', () => {
    const { container } = render(<ConditionPill label="Test" status="good" />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'px-4');
  });
});
