import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <div className='container'>
        <div className={s.inner}>You are in the Pokémon Collection</div>
      </div>
    </header>
  );
};
