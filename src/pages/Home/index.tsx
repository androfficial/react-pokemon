import { SelectChangeEvent } from '@mui/material';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { NavigationPanel } from 'pages/Home/components/NavigationPanel';
import { PokemonsList } from 'pages/Home/components/PokemonsList';
import { Placeholder } from 'pages/Home/components/PokemonsList/Placeholder';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchPokemons, fetchTypes } from 'store/slices/pokemonsSlice';

import s from './Home.module.scss';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();

  const {
    pokemons,
    types,
    limit,
    totalOffset,
    count,
    isSuccess,
    isLoading,
    isTypesFetching,
  } = useAppSelector(({ pokemons }) => ({
    pokemons: pokemons.pokemons,
    types: pokemons.types,
    limit: pokemons.paginationData.limit,
    totalOffset: pokemons.paginationData.totalOffset,
    count: pokemons.paginationData.count,
    isSuccess: pokemons.isSuccess,
    isLoading: pokemons.isLoading,
    isTypesFetching: pokemons.isTypesFetching,
  }));

  const [searchValue, setSearchValue] = useState<string>('');
  const [type, setType] = useState<string>(types[0].name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setSearchValue(e.target.value);

  const handleTypeChange = (e: SelectChangeEvent): void => {
    setType(e.target.value);
  };

  const filteredPokemons = useMemo(
    () =>
      pokemons
        .filter((el) =>
          el.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter((el) =>
          type === 'All'
            ? true
            : el.types.some((elType) => elType.type.name === type)
        ),
    [pokemons, searchValue, type]
  );

  useEffect(() => {
    if (totalOffset < count) {
      if (!isLoading && inView) {
        dispatch(fetchPokemons());
      }
    }
  }, [dispatch, inView, isLoading, totalOffset, count]);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemons());
    }
  }, [dispatch, pokemons.length]);

  useEffect(() => {
    if (types.length === 1) {
      dispatch(fetchTypes());
    }
  }, [dispatch, types.length]);

  return (
    <section className={s.root}>
      <div className={cn('container', s.container)}>
        <div className={s.content}>
          <NavigationPanel
            type={type}
            types={types}
            isSuccess={isSuccess}
            searchValue={searchValue}
            handleChange={handleChange}
            setSearchValue={setSearchValue}
            handleTypeChange={handleTypeChange}
          />
          {isSuccess ? (
            <PokemonsList
              filteredPokemons={filteredPokemons}
              limit={limit}
              type={type}
              isLoading={isLoading}
              searchValue={searchValue}
              spanRef={ref}
            />
          ) : (
            <div className={s.list}>
              <Placeholder limit={limit} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
