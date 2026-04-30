import type { Meta, StoryObj } from '@storybook/react';
import EmptySearch from './EmptySearch';

const meta = {
  title: 'Common/Empty/EmptySearch',
  component: EmptySearch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptySearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClear: () => alert('Clear search clicked'),
  },
};
