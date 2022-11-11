import { CSkeleton } from 'components/CSkeleton';
import { FC } from 'react';

interface IPlaceholder {
  limit: number;
}

export const Placeholder: FC<IPlaceholder> = ({ limit }) => {
  return (
    <>
      {[...Array(limit)].map((_, i) => (
        <CSkeleton key={i} height={370} />
      ))}
    </>
  );
};
