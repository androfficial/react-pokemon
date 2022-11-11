import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { INavigationPanel } from 'pages/Home/components/NavigationPanel';
import { FC } from 'react';

interface ICSelect {
  type: INavigationPanel['type'];
  types: INavigationPanel['types'];
  handleTypeChange: INavigationPanel['handleTypeChange'];
}

export const CSelect: FC<ICSelect> = ({ type, types, handleTypeChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='select'>Filter by type</InputLabel>
      <Select
        labelId='select'
        label='Filter by type'
        value={type}
        onChange={handleTypeChange}
      >
        {types.map(({ id, name }) => (
          <MenuItem key={id} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
