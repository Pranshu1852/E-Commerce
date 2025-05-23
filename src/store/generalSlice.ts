import { createSlice } from '@reduxjs/toolkit';

const initialGeneralState = {
  themeMode: localStorage.getItem('theme') || 'light',
  language: localStorage.getItem('lang') || 'en',
};

const generalSlice = createSlice({
  name: 'generalStates',
  initialState: initialGeneralState,
  reducers: {
    toggleTheme(state) {
      const newTheme = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      state.themeMode = newTheme;
    },
    setLanguage(state, action) {
      const newLanguage = action.payload;
      localStorage.setItem('lang', newLanguage);
      state.language = newLanguage;
    },
  },
});

const generalAction = generalSlice.actions;

export { generalSlice, generalAction };
