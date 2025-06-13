import { configureStore, createSelector } from '@reduxjs/toolkit';

import { generalSlice } from './generalSlice';

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
  },
});

const selectThemeMode = (state: StateType) => state.general.themeMode;
const selectLanguage = (state: StateType) => state.general.language;

export const storeSelector = createSelector(
  [selectThemeMode, selectLanguage],
  (themeMode, language) => {
    return {
      theme: themeMode,
      language: language,
    };
  }
);

export type StateType = ReturnType<typeof store.getState>;

export { store };
