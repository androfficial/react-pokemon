import s from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className='container'>
        <div className={s.inner}>You are in the Pokémon Collection</div>
      </div>
    </footer>
  );
};
