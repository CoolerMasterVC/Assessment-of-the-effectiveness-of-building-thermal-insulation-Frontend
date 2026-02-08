import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';
import type { User } from '../../types';

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

// СИНХРОННЫЕ actions (без thunk!)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action для начала логина
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Action для успешного логина
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    
    // Action для ошибки логина
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action для регистрации
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action для выхода
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    
    // Action для загрузки пользователя из localStorage
    loadUser: (state, action: PayloadAction<{ token: string | null; user: User | null }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Экспортируем actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  loadUser,
  clearError,
} = authSlice.actions;

// Функция логина БЕЗ thunk (обычная async функция)
export const loginUser = (credentials: { login: string; password: string }) => {
  return async (dispatch: any) => { // Используем обычную async функцию, не createAsyncThunk
    try {
      dispatch(loginStart());
      console.log('🔄 Логин без thunk:', credentials);
      
      const response = await userService.login(credentials); // ✅ Без кодогенерации
      console.log('✅ Ответ от сервера:', response);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch(loginSuccess(response));
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Ошибка авторизации';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  };
};

// ✅ Функция регистрации БЕЗ thunk
export const registerUser = (userData: { login: string; password: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch(registerStart());
      await userService.register(userData); // ✅ Без кодогенерации
      dispatch(registerSuccess());
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Ошибка регистрации';
      dispatch(registerFailure(errorMessage));
      throw error;
    }
  };
};

// ✅ Функция выхода БЕЗ thunk
export const logoutUser = () => {
  return async (dispatch: any) => {
    try {
      await userService.logout(); // ✅ Без кодогенерации
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
    }
  };
};

// ✅ Функция загрузки пользователя БЕЗ thunk
export const loadUserFromStorage = () => {
  return async (dispatch: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await userService.getCurrentUser(); // ✅ Без кодогенерации
        dispatch(loadUser({ token, user }));
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(loadUser({ token: null, user: null }));
      }
    } else {
      dispatch(loadUser({ token: null, user: null }));
    }
  };
};

export default authSlice.reducer;