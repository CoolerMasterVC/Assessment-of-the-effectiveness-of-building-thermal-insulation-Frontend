import { configureStore } from '@reduxjs/toolkit';
import materialsFilterSlice from './slices/materialsFilterSlice';

export const store = configureStore({
  reducer: {
    materialsFilter: materialsFilterSlice,
  },
  devTools: import.meta.env.MODE !== 'production', // Используем Vite env вместо process.env
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;