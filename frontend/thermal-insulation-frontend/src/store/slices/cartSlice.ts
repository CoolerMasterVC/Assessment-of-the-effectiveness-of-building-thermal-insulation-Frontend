import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api'; // Используем ваш кастомный axios инстанс

interface CartState {
  draftId: number | null;
  itemsCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  draftId: null,
  itemsCount: 0,
  loading: false,
  error: null,
};

export const getCartInfo = createAsyncThunk(
  'cart/getInfo',
  async (_, { rejectWithValue }) => {
    try {
      // Используем axios (который уже добавляет токен через interceptor)
      const response = await axios.get('/api/mat_applics/cart');
      return response.data;
    } catch (error: any) {
      // Если 401 - возвращаем пустую корзину (пользователь не авторизован)
      if (error.response?.status === 401) {
        return { application_id: null, items_count: 0 };
      }
      return rejectWithValue(error.response?.data?.error || 'Ошибка загрузки корзины');
    }
  }
);

export const addMaterialToDraft = createAsyncThunk(
  'cart/addMaterial',
  async ({ materialId, area }: { materialId: number; area: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/materials/${materialId}/add-to-draft`, { area });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка добавления в корзину');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.draftId = null;
      state.itemsCount = 0;
    },
    setCartInfo: (state, action) => {
      state.draftId = action.payload.application_id;
      state.itemsCount = action.payload.items_count || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.draftId = action.payload.application_id;
        state.itemsCount = action.payload.items_count || 0;
      })
      .addCase(getCartInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Ошибка загрузки корзины';
        state.draftId = null;
        state.itemsCount = 0;
      })
      .addCase(addMaterialToDraft.fulfilled, (state, action) => {
        // После добавления материала увеличиваем счетчик
        state.itemsCount = (state.itemsCount || 0) + 1;
        
        // Если это первая добавка и нет draftId, устанавливаем его
        if (!state.draftId && action.payload.application_id) {
          state.draftId = action.payload.application_id;
        }
      })
      .addCase(addMaterialToDraft.rejected, (state, action) => {
        console.error('Ошибка добавления в корзину:', action.payload);
      });
  },
});

export const { clearCart, setCartInfo } = cartSlice.actions;
export default cartSlice.reducer;