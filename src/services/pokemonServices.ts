// Axios client
import axiosInstance from '@/lib/axios';
// Interfaces
import { PokemonDetailResponse, PokemonListItem, PokemonListResponse } from './interface/pokemonInterface';

export const pokemonService = {
  /**
   * Get a list of Pokemons
   * @param limit Number of pokemons per page
   * @param offset Starting position of the list
   */
  getPokemons: async (limit: number, offset: number): Promise<PokemonListResponse> => {
    const response = await axiosInstance.get<PokemonListResponse>('/pokemon', {
      params: { limit, offset },
    });
    return response.data;
  },

  /**
   * Get Pokemon details by name or ID
   * @param nameOrId Name or ID of the Pokemon
   */
  getPokemonDetail: async (nameOrId: string | number): Promise<PokemonDetailResponse> => {
    const response = await axiosInstance.get<PokemonDetailResponse>(`/pokemon/${nameOrId}`);
    return response.data;
  },

  /**
   * Get a list of Pokemons along with their full details (supports Infinite Scroll)
   */
  getPokemonsWithDetails: async (limit: number, offset: number): Promise<{ data: PokemonDetailResponse[], nextOffset: number | null }> => {
    const list = await pokemonService.getPokemons(limit, offset);
    const detailsPromises = list.results.map(pokemon => pokemonService.getPokemonDetail(pokemon.name));
    const data = await Promise.all(detailsPromises);

    // If there is a next page, return the next offset
    const nextOffset = list.next ? offset + limit : null;

    return { data, nextOffset };
  },

  /**
   * Universal search: searches by Name, Type, or Ability simultaneously.
   */
  searchUniversal: async (query: string, limit: number, offset: number): Promise<{ data: PokemonDetailResponse[], nextOffset: number | null }> => {
    const fetchType = async () => {
      const typeRes = await axiosInstance.get(`/type/${query}`);
      const pokemonList = typeRes.data.pokemon.map((p: { pokemon: PokemonListItem }) => p.pokemon);
      const sliced = pokemonList.slice(offset, offset + limit);
      const data = await Promise.all(sliced.map((p: PokemonListItem) => pokemonService.getPokemonDetail(p.name)));
      return { data, nextOffset: offset + limit < pokemonList.length ? offset + limit : null };
    };

    const fetchAbility = async () => {
      const abilityRes = await axiosInstance.get(`/ability/${query}`);
      const pokemonList = abilityRes.data.pokemon.map((p: { pokemon: PokemonListItem }) => p.pokemon);
      const sliced = pokemonList.slice(offset, offset + limit);
      const data = await Promise.all(sliced.map((p: PokemonListItem) => pokemonService.getPokemonDetail(p.name)));
      return { data, nextOffset: offset + limit < pokemonList.length ? offset + limit : null };
    };

    const fetchName = async () => {
      if (offset > 0) throw new Error('No pagination for exact name');
      const detail = await pokemonService.getPokemonDetail(query);
      return { data: [detail], nextOffset: null };
    };

    return Promise.any([fetchType(), fetchAbility(), fetchName()]);
  },
};

