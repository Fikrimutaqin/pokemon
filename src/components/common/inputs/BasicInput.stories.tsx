import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BasicInput from './BasicInput';

const meta = {
  title: 'Common/Inputs/BasicInput',
  component: BasicInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BasicInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search for Pokemon...',
    type: 'text',
    value: '',
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[400px]">
      <BasicInput {...args} />
    </div>
  )
};
