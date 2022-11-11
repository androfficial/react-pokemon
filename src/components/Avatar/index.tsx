import { FC } from 'react';

import s from './Avatar.module.scss';

interface IAvatar {
  src: string;
  alt: string;
}

export const Avatar: FC<IAvatar> = ({ src, alt }) => {
  return <img className={s.avatar} src={src} alt={alt} loading='lazy' />;
};
