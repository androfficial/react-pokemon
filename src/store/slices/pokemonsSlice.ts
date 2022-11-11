import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPokemonInfo, getPokemons } from 'api/pokemons';
import { getTypes } from 'api/types';
import {
  IGetPokemonInfo,
  IGetTypesModified,
  IPaginationData,
} from 'types/index';

export const fetchTypes = createAsyncThunk(
  'pokemons/fetchTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTypes();

      return response.data.results.map(
        (el, i): IGetTypesModified => ({
          id: i + 1,
          name: el.name,
        })
      );
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (_, { getState, rejectWithValue }) => {
    // @ts-ignore:next-line
    const { pokemons } = getState();
    const { totalOffset, limit } = pokemons.paginationData;

    try {
      const response = await getPokemons(limit, totalOffset);

      const getEveryPokemon = async () => {
        return Promise.all(
          response.data.results.map(async ({ name, url }) => {
            const response = await getPokemonInfo(name);
            return response.data;
          })
        );
      };

      return {
        ...response.data,
        results: await getEveryPokemon(),
      };
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const fetchPokemon = createAsyncThunk(
  'pokemons/fetchPokemon',
  async (payload: { name: string }, { rejectWithValue }) => {
    const { name } = payload;

    try {
      const response = await getPokemonInfo(name);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  pokemons: [] as IGetPokemonInfo[],
  viewedPokemons: [] as IGetPokemonInfo[],
  types: [
    {
      id: 0,
      name: 'All',
    },
  ] as IGetTypesModified[],
  paginationData: {
    limit: 9,
    initialOffset: 9,
    totalOffset: 0,
    count: 0,
    next: '',
    previous: '',
  } as IPaginationData,
  isSuccess: false,
  isLoading: false,
  isTypesFetching: false,
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTypes.pending.type]: (state) => {
      state.isTypesFetching = true;
    },
    [fetchTypes.fulfilled.type]: (
      state,
      action: PayloadAction<IGetTypesModified[]>
    ) => {
      state.types = [...state.types, ...action.payload];
      state.isTypesFetching = false;
    },
    [fetchTypes.rejected.type]: (state) => {
      state.isTypesFetching = false;
    },

    [fetchPokemons.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPokemons.fulfilled.type]: (
      state,
      action: PayloadAction<{
        count: number;
        next: string | null;
        previous: string | null;
        results: IGetPokemonInfo[];
      }>
    ) => {
      const { count, next, previous, results } = action.payload;

      state.pokemons = [...state.pokemons, ...results];
      state.paginationData = {
        ...state.paginationData,
        totalOffset:
          state.paginationData.initialOffset + state.paginationData.totalOffset,
        count,
        next,
        previous,
      };
      state.isSuccess = true;
      state.isLoading = false;
    },
    [fetchPokemons.rejected.type]: (state) => {
      state.isLoading = false;
    },

    [fetchPokemon.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPokemon.fulfilled.type]: (
      state,
      action: PayloadAction<IGetPokemonInfo>
    ) => {
      state.viewedPokemons = [...state.viewedPokemons, action.payload];
      state.isLoading = false;
    },
    [fetchPokemon.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default pokemonsSlice.reducer;
