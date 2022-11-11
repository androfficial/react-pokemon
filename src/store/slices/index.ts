import { combineReducers } from '@reduxjs/toolkit';

import pokemons from './pokemonsSlice';

export const rootReducer = combineReducers({
  pokemons,
});

export type RootState = ReturnType<typeof rootReducer>;
