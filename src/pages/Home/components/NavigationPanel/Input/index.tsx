import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import cn from 'classnames';
import { INavigationPanel } from 'pages/Home/components/NavigationPanel';
import { FC } from 'react';

import s from './Input.module.scss';

interface IInput {
  searchValue: INavigationPanel['searchValue'];
  handleChange: INavigationPanel['handleChange'];
  setSearchValue: INavigationPanel['setSearchValue'];
}

export const Input: FC<IInput> = ({
  searchValue,
  handleChange,
  setSearchValue,
}) => {
  return (
    <TextField
      className={s.input}
      label='Search pokemon'
      placeholder='Search pokemon'
      variant='outlined'
      value={searchValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <button className={s.icon} type='button'>
            <SearchIcon />
          </button>
        ),
        endAdornment: (
          <button
            onClick={() => setSearchValue('')}
            className={cn(s.closeIcon, {
              [s.visible]: searchValue,
            })}
            type='button'
          >
            <CloseIcon />
          </button>
        ),
      }}
      fullWidth
    />
  );
};
