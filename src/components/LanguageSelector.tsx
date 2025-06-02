import { MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { generalAction } from '../store/generalSlice';
import type { StateType } from '../store/store';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { language } = useSelector((state: StateType) => {
    return {
      language: state.general.language,
    };
  });

  function handleLanguageChange(lang: string) {
    dispatch(generalAction.setLanguage(lang));
    i18n.changeLanguage(lang);
  }

  return (
    <TextField
      id='outlined-select-currency '
      select
      defaultValue='en'
      size='small'
      sx={{
        color: 'black',
        border: 'none',
      }}
      value={language}
      onChange={(event) => {
        handleLanguageChange(event.target.value);
      }}
    >
      <MenuItem value='en'>English</MenuItem>
      <MenuItem value='gj'>Gujarati</MenuItem>
      <MenuItem value='hi'>Hindi</MenuItem>
      <MenuItem value='fr'>French</MenuItem>
      <MenuItem value='ar'>Arabic</MenuItem>
    </TextField>
  );
}

export default LanguageSelector;
