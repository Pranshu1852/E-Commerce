import { configureStore } from '@reduxjs/toolkit';

import { generalSlice } from './generalSlice';

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;

export { store };
