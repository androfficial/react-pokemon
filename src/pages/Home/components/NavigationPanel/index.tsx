import { SelectChangeEvent } from '@mui/material';
import { CSkeleton } from 'components/CSkeleton';
import { CSelect } from 'pages/Home/components/NavigationPanel/CSelect';
import { Input } from 'pages/Home/components/NavigationPanel/Input';
import { ChangeEvent, FC } from 'react';
import { IGetTypesModified } from 'types';

import s from './NavigationPanel.module.scss';

export interface INavigationPanel {
  type: string;
  types: IGetTypesModified[];
  isSuccess: boolean;
  searchValue: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearchValue: (v: string) => void;
  handleTypeChange: (e: SelectChangeEvent) => void;
}

export const NavigationPanel: FC<INavigationPanel> = ({
  type,
  types,
  isSuccess,
  searchValue,
  handleChange,
  setSearchValue,
  handleTypeChange,
}) => {
  return (
    <div className={s.root}>
      {isSuccess ? (
        <Input
          searchValue={searchValue}
          handleChange={handleChange}
          setSearchValue={setSearchValue}
        />
      ) : (
        <CSkeleton />
      )}
      {isSuccess ? (
        <CSelect
          type={type}
          types={types}
          handleTypeChange={handleTypeChange}
        />
      ) : (
        <CSkeleton />
      )}
    </div>
  );
};
