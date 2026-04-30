import { describe, it, expect } from 'vitest';
import favoriteReducer, { addFavorite, removeFavorite, FavoritePokemon } from '../favoriteSlice';

describe('Favorite Redux Slice', () => {
  // test the initial state when the app first loads
  // make sure the favorites list starts out completely empty
  it('should return the initial state', () => {
    expect(favoriteReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  // test what happens when a user clicks the heart button
  it('should add a new pokemon to the favorite list', () => {
    const initialState = { items: [] };
    const newPokemon: FavoritePokemon = {
      id: 25,
      name: 'pikachu',
      nickname: 'Sparky',
      imageUrl: 'pikachu.png',
      types: ['electric'],
      collectionType: 'Team',
      description: 'My first pokemon',
      stats: { attack: 55, defense: 40, speed: 90 },
      addedAt: '2026-04-30T00:00:00.000Z'
    };

    // try throwing the addFavorite action at the reducer
    const actual = favoriteReducer(initialState, addFavorite(newPokemon));

    // we should now have exactly 1 pikachu in our items array
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].id).toEqual(25);
    expect(actual.items[0].nickname).toEqual('Sparky');
  });

  // test the duplicate handling. if the pokemon is already in the list,
  // don't add it again, just update the existing data (like if the user changed the nickname)
  it('should overwrite existing pokemon if added again (edit functionality)', () => {
    const existingPokemon: FavoritePokemon = {
      id: 25,
      name: 'pikachu',
      nickname: 'Sparky',
      imageUrl: 'pikachu.png',
      types: ['electric'],
      collectionType: 'Team',
      description: '',
      stats: { attack: 55, defense: 40, speed: 90 },
      addedAt: '2026-04-30T00:00:00.000Z'
    };

    const initialState = { items: [existingPokemon] };

    // let's pretend the user updated the nickname
    const updatedPokemon = { ...existingPokemon, nickname: 'Raichu-wannabe' };

    const actual = favoriteReducer(initialState, addFavorite(updatedPokemon));

    // the item count should stay at 1, but the nickname should reflect the update
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].nickname).toEqual('Raichu-wannabe');
  });

  // test removing a pokemon from the collection
  it('should remove a pokemon by its ID', () => {
    const initialState = {
      items: [
        {
          id: 1, name: 'bulbasaur', nickname: '', imageUrl: '', types: [], collectionType: 'Team', description: '', stats: { attack: 0, defense: 0, speed: 0 }, addedAt: ''
        },
        {
          id: 4, name: 'charmander', nickname: '', imageUrl: '', types: [], collectionType: 'Team', description: '', stats: { attack: 0, defense: 0, speed: 0 }, addedAt: ''
        }
      ]
    };

    // try removing bulbasaur (id 1)
    const actual = favoriteReducer(initialState, removeFavorite(1));

    // only 1 item should be left, and it better be charmander (id 4)
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].id).toEqual(4);
  });
});
