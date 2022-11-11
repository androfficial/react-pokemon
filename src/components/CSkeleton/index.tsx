import { Skeleton } from '@mui/material';
import { FC } from 'react';

interface ICSkeleton {
  animation?: 'pulse' | 'wave' | false;
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text';
  width?: number | string;
  height?: number | string;
}

export const CSkeleton: FC<ICSkeleton> = ({
  animation = 'wave',
  variant = 'rounded',
  width = '100%',
  height = 56,
}) => {
  return (
    <Skeleton
      animation={animation}
      variant={variant}
      width={width}
      height={height}
    />
  );
};
