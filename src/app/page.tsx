import PokemonCard from "@/components/common/cards/PokemonCard";
import SearchSection from "@/components/sections/SearchSection";

export default function Home() {
  return (
    <main className="container mx-auto my-5 pt-16 lg:px-0 px-3 flex flex-col justify-center items-center gap-y-7">
      <SearchSection />

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <PokemonCard
            key={index}
            id={`${index + 1}`}
            name={`Pokemon ${index + 1}`}
            types={['Grass', 'Poison']}
            imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
            backgroundColor="#48D0B0"
          />
        ))}
      </div>
    </main>
  );
}
