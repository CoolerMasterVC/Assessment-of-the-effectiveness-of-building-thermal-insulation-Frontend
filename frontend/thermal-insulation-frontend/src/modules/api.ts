// src/modules/api.ts
import type { Material, MaterialsFilter } from '../types';
import { MATERIALS_MOCK } from './mock';

// Используем относительный URL - Vite proxy добавит /api
const API_BASE = 'http://localhost:8080/api';

// URL для изображений из API (если используется реальный бэкенд)
const API_IMAGE_BASE = 'http://localhost:9000/images/default-material.jpg';

// URL для изображений из public папки (если используются mock данные)
const PUBLIC_IMAGE_BASE = '../../public/default-material.jpg';

const DEFAULT_IMAGE_NAME = 'default-material.jpg';

export const materialsApi = {
  getMaterials: async (filters?: MaterialsFilter): Promise<Material[]> => {
    try {
      console.log('🔍 Fetching from:', `${API_BASE}/materials`);
      
      const params = new URLSearchParams();
      if (filters?.search) params.append('filter', filters.search);
      
      const response = await fetch(`${API_BASE}/materials?${params}`);
      
      console.log('📨 Response status:', response.status);
      console.log('📨 Response URL:', response.url);
      
      const contentType = response.headers.get('content-type');
      console.log('📨 Content-Type:', contentType);
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Expected JSON but got:', text.substring(0, 200));
        throw new Error(`Expected JSON but got: ${contentType}`);
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Received REAL data from API:', data);
      
      // Для реальных данных используем изображения из API
      const processedMaterials = data.map((material: Material) => ({
        ...material,
        image_url: material.image_url || `${API_IMAGE_BASE}`
      }));
      
      return processedMaterials;
      
    } catch (error) {
      console.warn('⚠️ Using mock data due to API error:', error);
      
      // Для mock данных используем изображения из public папки
      let filtered = MATERIALS_MOCK.map(material => ({
        ...material,
        image_url: `${PUBLIC_IMAGE_BASE}`
      }));
      
      if (filters?.search) {
        filtered = filtered.filter(material => 
          material.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          material.description.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      
      return filtered;
    }
  },

  getMaterial: async (id: number): Promise<Material> => {
    try {
      const response = await fetch(`${API_BASE}/materials/${id}`);
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but got: ${contentType}`);
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const material = await response.json();
      console.log('✅ Received material from API:', material);
      
      // Для реальных данных используем изображения из API
      return {
        ...material,
        image_url: material.image_url || `${API_IMAGE_BASE}`
      };
      
    } catch (error) {
      console.warn('⚠️ Using mock data due to API error:', error);
      const material = MATERIALS_MOCK.find(m => m.id === id);
      if (!material) throw new Error('Material not found');
      
      // Для mock данных используем изображения из public папки
      return {
        ...material,
        image_url: `${PUBLIC_IMAGE_BASE}`
      };
    }
  }
};