// src/store/slices/materialsFilterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MaterialsFilterState {
  searchTerm: string;
  minPrice: number | null;
  maxPrice: number | null;
  status: string;
}

const initialState: MaterialsFilterState = {
  searchTerm: '',
  minPrice: null,
  maxPrice: null,
  status: 'действует',
};

const materialsFilterSlice = createSlice({
  name: 'materialsFilter',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.minPrice = null;
      state.maxPrice = null;
      state.status = 'действует';
    },
  },
});

export const { setSearchTerm, setPriceRange, setStatus, clearFilters } = materialsFilterSlice.actions;
export default materialsFilterSlice.reducer;