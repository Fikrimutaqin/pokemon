// Services
import { pokemonColorService } from '@/services/pokemonColorService';
// Interfaces
import { PokemonDetailResponse } from '@/services/interface/pokemonInterface';
// Components
import PokemonCard from './PokemonCard';

export default function PokemonCardWrapper({
  pokemonDetail,
  priority
}: {
  pokemonDetail: PokemonDetailResponse;
  priority?: boolean;
}) {
  const types = pokemonDetail.types.map((t) => t.type.name);

  // Set background color based on pokemon type
  const backgroundColor = types.length > 0 ? pokemonColorService.getColorByType(types[0]) : '#374151';

  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE}/${pokemonDetail.id}.png`;

  return (
    <PokemonCard
      id={pokemonDetail.id.toString()}
      name={pokemonDetail.name}
      types={types}
      imageUrl={imageUrl}
      backgroundColor={backgroundColor}
      priority={priority}
    />
  );
}
