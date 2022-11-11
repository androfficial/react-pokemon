import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import cn from 'classnames';
import { Avatar } from 'components/Avatar';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPokemon } from 'store/slices/pokemonsSlice';

import s from './Pokemon.module.scss';

export const Pokemon = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { viewedPokemons } = useAppSelector(({ pokemons }) => ({
    viewedPokemons: pokemons.viewedPokemons,
  }));

  const displayedPokemon = useMemo(
    () => viewedPokemons.find((el) => el.name === name),
    [name, viewedPokemons]
  );

  useEffect(() => {
    if (!displayedPokemon) {
      dispatch(fetchPokemon({ name } as { name: string }));
    }
  }, [dispatch, name, displayedPokemon]);

  return (
    <section className={s.root}>
      <div className={cn('container', s.container)}>
        <div className={s.inner}>
          {displayedPokemon ? (
            <>
              <Button
                onClick={() => navigate('/')}
                className={s.button}
                startIcon={<ArrowBackIcon />}
                variant='contained'
              >
                Back
              </Button>
              <div className={s.card}>
                <div className={s.top}>
                  <Avatar
                    src={displayedPokemon.sprites.front_default as string}
                    alt={displayedPokemon.name}
                  />
                </div>
                <div className={s.bottom}>
                  <div className={s.name}>{displayedPokemon.name}</div>
                  <div className={s.moves}>
                    <p className={s.title}>Moves:</p>
                    <ul className={s.movesList}>
                      {displayedPokemon.moves.map((el) => (
                        <li key={el.move.name}>
                          <p className={s.movesText}>{el.move.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={s.stats}>
                    <p className={s.title}>Stats:</p>
                    <ul className={s.statsList}>
                      {displayedPokemon.stats.map((el) => (
                        <li key={el.stat.name} className={s.statsItem}>
                          <p className={s.ability}>{el.stat.name}</p>
                          <p className={s.count}>{el.base_stat}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress size={60} variant='indeterminate' />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
