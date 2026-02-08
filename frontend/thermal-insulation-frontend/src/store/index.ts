import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import materialsReducer from './slices/materialsSlice';
import userReducer from './slices/userSlice';
import applicationsReducer from './slices/applicationsSlice';
import cartReducer from './slices/cartSlice';
import materialsFilterReducer from './slices/materialsFilterSlice'; // Добавить эту строку

export const store = configureStore({
  reducer: {
    auth: authReducer,
    materials: materialsReducer,
    user: userReducer,
    applications: applicationsReducer,
    cart: cartReducer,
    materialsFilter: materialsFilterReducer, // Добавить эту строку
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;