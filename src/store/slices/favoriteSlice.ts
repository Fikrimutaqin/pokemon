import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
export interface FavoritePokemon {
  id: number;
  name: string;
  nickname: string;
  collectionType: string;
  description: string;
  types: string[];
  imageUrl: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
  };
  addedAt: string;
}

// Interface State
interface FavoriteState {
  items: FavoritePokemon[];
}

// Initial State
const initialState: FavoriteState = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    // Add Favorite
    addFavorite: (state, action: PayloadAction<FavoritePokemon>) => {
      // Remove if already exists
      state.items = state.items.filter((p) => p.id !== action.payload.id);
      state.items.push(action.payload);
    },
    // Remove Favorite
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

// Actions
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
// Reducer
export default favoriteSlice.reducer;
