import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import AccordionFilter, { type FilterOption } from '../../components/Filter/AccordionFilter';

vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // just return the key
  }),
}));
describe('AccordionFilter', () => {
  const options: FilterOption[] = [
    { id: '1', label: 'Option 1', count: 5 },
    { id: '2', label: 'Option 2', count: 10 },
  ];

  it('renders the title and icon', () => {
    const { getByText } = render(
      <AccordionFilter
        title="Test Filter"
        icon="filter_alt"
        options={options}
        value={[]}
        onChange={() => {}}
      />,
    );

    expect(getByText('Test Filter')).toBeDefined();
    expect(getByText('filter_alt')).toBeDefined();
  });

  it('toggles open/close when header is clicked', async () => {
    const { getByText, queryByText } = render(
      <AccordionFilter
        title="Toggle Filter"
        icon="filter_alt"
        options={options}
        value={[]}
        onChange={() => {}}
      />,
    );

    const header = getByText('Toggle Filter').closest('button');
    expect(header).toBeDefined();
    expect(queryByText('Option 1')).toBeNull();

    if (header) {
      await fireEvent.click(header);
      expect(queryByText('Option 1')).toBeDefined();

      await fireEvent.click(header);
      expect(queryByText('Option 1')).toBeNull();
    }
  });

  it('calls onChange when checkbox is clicked', async () => {
    const onChange = vi.fn();

    const { getByText, getByLabelText } = render(
      <AccordionFilter
        title="Checkbox Filter"
        icon="filter_alt"
        options={options}
        value={[]}
        onChange={onChange}
      />,
    );

    // Open the accordion
    const header = getByText('Checkbox Filter').closest('button');
    if (header) {
      await fireEvent.click(header);
    }

    // Now the checkboxes are in the DOM
    const option1 = getByLabelText('Option 1');
    await fireEvent.click(option1);
    expect(onChange).toHaveBeenCalledWith(['1']);
  });
  it('selects all and unselects all', async () => {
    const onChange = vi.fn();

    const { getByText } = render(
      <AccordionFilter
        title="Select Filter"
        icon="filter_alt"
        options={options}
        value={[]}
        onChange={onChange}
      />,
    );

    // Open the accordion
    const header = getByText('Select Filter').closest('button');
    if (header) {
      await fireEvent.click(header);
    }

    const selectAllButton = getByText('buy.selectAll');
    const unselectAllButton = getByText('buy.unselectAll');

    await fireEvent.click(selectAllButton);
    expect(onChange).toHaveBeenCalledWith(['1', '2']);

    await fireEvent.click(unselectAllButton);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('works as radio', async () => {
    const onChange = vi.fn();

    const { getByText, getByLabelText } = render(
      <AccordionFilter
        title="Radio Filter"
        icon="filter_alt"
        options={options}
        value={[]}
        onChange={onChange}
        radio
      />,
    );

    // First, open the accordion
    const header = getByText('Radio Filter').closest('button');
    if (header) {
      await fireEvent.click(header);
    }

    // Now the radio buttons are in the DOM
    const option1 = getByLabelText('Option 1');
    const option2 = getByLabelText('Option 2');

    await fireEvent.click(option1);
    expect(onChange).toHaveBeenCalledWith(['1']);

    await fireEvent.click(option2);
    expect(onChange).toHaveBeenCalledWith(['2']);
  });
});
