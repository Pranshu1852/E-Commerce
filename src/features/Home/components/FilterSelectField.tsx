import { MenuItem, TextField } from '@mui/material';
import { useState, type ChangeEvent } from 'react';

import type { filterSelectOptionType } from '../../../types/ProductTypes';

interface FilterSelectProps {
  label: string;
  options: Array<filterSelectOptionType>;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

function FilterSelectField({
  label,
  options,
  value: initValue,
  name,
  onChange,
  isLoading,
}: FilterSelectProps) {
  const [value, setValue] = useState(initValue);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label htmlFor=''>{label}</label>
      <TextField
        id='outlined-select-currency '
        select
        defaultValue='en'
        size='small'
        fullWidth
        sx={{
          color: 'black',
          border: 'none',
          '& .MuiSelect-select': {
            color: 'black',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '& .css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
            height: '120px',
          },
          '& .MuiSvgIcon-root': {
            color: 'black',
          },
        }}
        name={name}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
          onChange(event);
        }}
      >
        {options.map((option) => {
          return <MenuItem value={option.value}>{option.label}</MenuItem>;
        })}
        {isLoading && <li>Loading...</li>}
      </TextField>
    </div>
  );
}

export default FilterSelectField;
