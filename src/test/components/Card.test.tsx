import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../components/Card';

describe('Card component', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Card description="Card Description">Content</Card>);
    expect(screen.getByText('Card Description')).toBeInTheDocument();
  });

  it('renders both title and description', () => {
    render(
      <Card title="Card Title" description="Card Description">
        Content
      </Card>,
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
  });

  it('renders headerAction when provided', () => {
    render(<Card headerAction={<button>Action</button>}>Content</Card>);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders header only if title, description, or headerAction exists', () => {
    const { container, rerender } = render(<Card>Content</Card>);
    // No header should exist
    expect(container.querySelector('div.mb-4')).toBeNull();

    // Header should exist if title is provided
    rerender(<Card title="Title">Content</Card>);
    expect(container.querySelector('div.mb-4')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
