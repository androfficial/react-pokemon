import { Avatar } from 'components/Avatar';
import { Placeholder } from 'pages/Home/components/PokemonsList/Placeholder';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IGetPokemonInfo } from 'types';

import s from './PokemonsList.module.scss';

interface IPokemonsList {
  filteredPokemons: IGetPokemonInfo[];
  limit: number;
  type: string;
  isLoading: boolean;
  searchValue: string;
  spanRef: (node?: Element | null | undefined) => void;
}
export const PokemonsList: FC<IPokemonsList> = ({
  filteredPokemons,
  limit,
  type,
  isLoading,
  searchValue,
  spanRef,
}) => {
  if (filteredPokemons.length === 0) return null;

  return (
    <ul className={s.list}>
      {filteredPokemons.map((el) => (
        <Link className={s.wrapper} key={el.name} to={`/${el.name}`}>
          <li className={s.item}>
            <article className={s.card}>
              <div className={s.top}>
                <Avatar
                  src={el.sprites.front_default as string}
                  alt={el.name}
                />
              </div>
              <div className={s.bottom}>
                <p className={s.name}>{el.name}</p>
                <p className={s.order}>{`#${el.id}`}</p>
                <ul className={s.typeList}>
                  {el.types.map((el) => (
                    <li key={el.type.name}>
                      <p>{`- ${el.type.name}`}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        </Link>
      ))}
      {isLoading && <Placeholder limit={limit} />}
      {!searchValue && type === 'All' && (
        <span ref={spanRef} className={s.lazyLoad} />
      )}
    </ul>
  );
};
