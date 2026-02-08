import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Material } from '../../types';

interface MaterialsState {
  materials: Material[];
  filteredMaterials: Material[];
  currentMaterial: Material | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: MaterialsState = {
  materials: [],
  filteredMaterials: [],
  currentMaterial: null,
  loading: false,
  error: null,
  searchTerm: '',
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    // Синхронные actions
    setMaterials: (state, action: PayloadAction<Material[]>) => {
      state.materials = action.payload;
      state.filteredMaterials = action.payload;
    },
    setCurrentMaterial: (state, action: PayloadAction<Material>) => {
      state.currentMaterial = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredMaterials = state.materials.filter(material =>
        material.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        material.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearMaterials: (state) => {
      state.materials = [];
      state.filteredMaterials = [];
      state.currentMaterial = null;
    },
  },
});

export const {
  setMaterials,
  setCurrentMaterial,
  setLoading,
  setError,
  setSearchTerm,
  clearMaterials,
} = materialsSlice.actions;

export default materialsSlice.reducer;