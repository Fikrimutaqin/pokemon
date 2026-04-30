import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import HomePageClient from './home';
import { pokemonService } from '@/services/pokemonServices';

export default async function Page() {
  const queryClient = new QueryClient();

  // Pre-fetch the first page of pokemon details on the server to fix LCP delay
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['pokemonList', ''],
    queryFn: () => pokemonService.getPokemonsWithDetails(20, 0),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageClient />
    </HydrationBoundary>
  );
}
