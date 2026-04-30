'use client';
// Core React
import { useState } from "react";
// TanStack Query
import { useInfiniteQuery } from "@tanstack/react-query";
// Services
import { pokemonService } from "@/services/pokemonServices";
// Hooks
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
// Components
import PokemonCardWrapper from "@/components/common/cards/PokemonCardWrapper";
import PokemonCardSkeleton from "@/components/common/cards/PokemonCardSkeleton";
import SearchSection from "@/components/sections/SearchSection";
import EmptySearch from "@/components/common/empty/EmptySearch";

export default function Home() {
  // infinite scroll config limit
  const limit = 20;

  // State for raw input search value
  const [inputValue, setInputValue] = useState('');

  // Debounce the raw input
  const debouncedValue = useDebounce(inputValue, 500);

  // Clean query for the API call (lowercase, no spaces)
  const searchQuery = (debouncedValue || '').trim().toLowerCase().replace(/\s+/g, '-');

  // Unify list and search into one powerful infinite query!
  const {
    data: listData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['pokemonList', searchQuery],
    queryFn: ({ pageParam = 0 }) => {
      if (searchQuery) {
        return pokemonService.searchUniversal(searchQuery, limit, pageParam);
      }
      return pokemonService.getPokemonsWithDetails(limit, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextOffset ?? null,
  });

  // Attach infinite scroll observer
  const { observerTarget } = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    !!hasNextPage
  );

  // Prepare data to display
  const displayData = listData?.pages.flatMap(page => page?.data || []) || [];

  return (
    <main className="container mx-auto my-5 pt-16 lg:px-0 px-3 flex flex-col items-center gap-y-7 min-h-screen">
      <SearchSection value={inputValue} onChange={setInputValue} />

      <div className={searchQuery && displayData.length === 1 ? "w-80 mx-auto" : "grid lg:grid-cols-4 grid-cols-1 gap-4 w-full"}>

        {!isLoading && !isError && displayData.map((pokemonDetail, index) => (
          <PokemonCardWrapper
            key={pokemonDetail.id}
            pokemonDetail={pokemonDetail}
            priority={index < 8}
          />
        ))}

        {/* Infinite Scroll Target */}
        {!isLoading && !isError && displayData.length > 0 && (
          <div ref={observerTarget} className="flex justify-center w-full col-span-full mt-8 mb-10 h-10">
            {isFetchingNextPage && (
              <div className="flex gap-4 w-full">
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
              </div>
            )}
          </div>
        )}
      </div>


      {isLoading && (
        <>
          <div className="flex flex-row gap-4 justify-center items-center w-full">
            <>
              <PokemonCardSkeleton />
              <PokemonCardSkeleton />
              <PokemonCardSkeleton />
            </>
          </div>
        </>
      )}

      <div className="flex flex-row gap-4 justify-center items-center w-80">
        {isError && (
          searchQuery
            ? <EmptySearch onClear={() => setInputValue('')} />
            : <div className="text-white col-span-full text-center">
              Failed to load Pokemon list.
            </div>
        )}
      </div>

      <div className="flex flex-row gap-4 justify-center items-center w-80">
        {/* Jika list kosong tapi tidak error (mungkin berhasil API tapi array kosong) */}
        {!isLoading && !isError && displayData.length === 0 && (
          searchQuery ? <EmptySearch onClear={() => setInputValue('')} /> : null
        )}
      </div>

    </main>
  );
}
