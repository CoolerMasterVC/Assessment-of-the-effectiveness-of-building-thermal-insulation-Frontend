import axios from '../api';
import type { Material } from '../types';

export const materialService = {
  // Получить все материалы
  getMaterials: async (filter?: string): Promise<Material[]> => {
    const params = filter ? { filter } : {};
    const response = await axios.get('/api/materials', { params });
    return response.data;
  },

  // Получить материал по ID
  getMaterial: async (id: number): Promise<Material> => {
    const response = await axios.get(`/api/materials/${id}`);
    return response.data;
  },

  // Создать материал (для модераторов)
  createMaterial: async (material: Omit<Material, 'id' | 'created_at' | 'status'>): Promise<Material> => {
    const response = await axios.post('/api/materials', material);
    return response.data;
  },

  // Обновить материал
  updateMaterial: async (id: number, material: Partial<Material>): Promise<Material> => {
    const response = await axios.put(`/api/materials/${id}`, material);
    return response.data;
  },

  // Удалить материал
  deleteMaterial: async (id: number): Promise<void> => {
    await axios.delete(`/materials/${id}`);
  },

  // Загрузить изображение
  uploadImage: async (id: number, imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await axios.post(`/api/materials/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.image_url;
  },
};