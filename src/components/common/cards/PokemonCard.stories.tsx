import type { Meta, StoryObj } from '@storybook/react';
import PokemonCard from './PokemonCard';

const meta = {
  title: 'Common/Cards/PokemonCard',
  component: PokemonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '25',
    name: 'pikachu',
    types: ['electric'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  },
  render: (args) => (
    <div className="w-[300px]">
      <PokemonCard {...args} />
    </div>
  )
};

export const MultiType: Story = {
  args: {
    id: '6',
    name: 'charizard',
    types: ['fire', 'flying'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  },
  render: (args) => (
    <div className="w-[300px]">
      <PokemonCard {...args} />
    </div>
  )
};
