import axios from '../api';
import type { User, LoginCredentials, RegisterData, UpdateUserData } from '../types';

export const userService = {
  // Регистрация
  register: async (data: RegisterData): Promise<{message: string}> => {
    try {
      const response = await axios.post('/api/users/register', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации');
    }
  },

  // Логин
  login: async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
    try {
      console.log('🔄 Отправка запроса на логин:', credentials);
      console.log('📤 URL:', '/api/users/login');
      
      const response = await axios.post('/api/users/login', credentials);
      console.log('✅ Ответ от сервера:', response.data);
      
      // Проверяем структуру ответа
      if (!response.data.token || !response.data.user) {
        throw new Error('Некорректный ответ от сервера');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Ошибка логина:', error);
      
      // Если сервер вернул HTML вместо JSON
      if (error.response?.headers?.['content-type']?.includes('text/html')) {
        throw new Error('Сервер вернул HTML вместо JSON. Проверьте CORS настройки бекенда.');
      }
      
      throw new Error(error.response?.data?.error || error.message || 'Ошибка авторизации');
    }
  },

  // Выход
  logout: async (): Promise<void> => {
    try {
      await axios.post('/api/users/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Получить текущего пользователя
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await axios.get('/api/users/me');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  // Обновить профиль
  updateProfile: async (data: UpdateUserData): Promise<User> => {
    try {
      const response = await axios.put('/api/users/me', data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};