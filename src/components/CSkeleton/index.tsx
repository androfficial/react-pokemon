import { Skeleton } from '@mui/material';
import { FC, Key } from 'react';

interface ICSkeleton {
  key?: Key;
  animation?: 'pulse' | 'wave' | false;
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text';
  width?: number | string;
  height?: number | string;
}

export const CSkeleton: FC<ICSkeleton> = ({
  key,
  animation = 'wave',
  variant = 'rounded',
  width = '100%',
  height = 56,
}) => {
  return (
    <Skeleton
      key={key}
      animation={animation}
      variant={variant}
      width={width}
      height={height}
    />
  );
};
