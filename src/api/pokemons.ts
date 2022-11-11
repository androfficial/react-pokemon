import { axiosInstance } from 'api/instance';
import { AxiosResponse } from 'axios';
import { IGetPokemonInfo, IGetPokemons } from 'types';

export const getPokemons = (
  limit: number,
  offset: number
): Promise<AxiosResponse<IGetPokemons>> =>
  axiosInstance.get<IGetPokemons>(`/pokemon?limit=${limit}&offset=${offset}`);

export const getPokemonInfo = (
  name: string
): Promise<AxiosResponse<IGetPokemonInfo>> =>
  axiosInstance.get<IGetPokemonInfo>(`/pokemon/${name}`);
