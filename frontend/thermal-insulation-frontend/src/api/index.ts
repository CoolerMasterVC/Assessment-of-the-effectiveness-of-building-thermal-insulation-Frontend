import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // БЕЗ /api в конце!
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Интерцептор для добавления токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если 401 и это не страница логина, редиректим
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Не редиректим автоматически, просто очищаем localStorage
      console.warn('Сессия истекла. Требуется повторный вход.');
    }
    return Promise.reject(error);
  }
);

export default api;