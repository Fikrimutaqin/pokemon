import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from './SelectInput';

const meta = {
  title: 'Common/Inputs/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Collection Type',
    options: [
      { label: 'Team', value: 'Team' },
      { label: 'Wishlist', value: 'Wishlist' },
      { label: 'Owned', value: 'Owned' }
    ],
    value: 'Team',
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[400px]">
      <SelectInput {...args} />
    </div>
  )
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Please select a valid option',
    requiredIndicator: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <SelectInput {...args} />
    </div>
  )
};
