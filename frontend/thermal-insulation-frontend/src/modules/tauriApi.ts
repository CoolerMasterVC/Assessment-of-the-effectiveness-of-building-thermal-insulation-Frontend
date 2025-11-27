// src/modules/tauriApi.ts
// Пока закомментируем, так как Tauri API требует специальной настройки
/*
import { invoke } from '@tauri-apps/api/tauri';

export const tauriApi = {
  getMaterials: async () => {
    try {
      const materials = await invoke('get_materials');
      return materials;
    } catch (error) {
      console.error('Error fetching materials via Tauri:', error);
      throw error;
    }
  },

  getMaterial: async (id: number) => {
    try {
      const material = await invoke('get_material', { id });
      return material;
    } catch (error) {
      console.error('Error fetching material via Tauri:', error);
      throw error;
    }
  },

  getCartInfo: async () => {
    try {
      const cartInfo = await invoke('get_cart_info');
      return cartInfo;
    } catch (error) {
      console.error('Error fetching cart info via Tauri:', error);
      throw error;
    }
  },
};
*/

// Временная заглушка
export const tauriApi = {
  getMaterials: async () => {
    throw new Error('Tauri API not configured');
  },
  getMaterial: async () => {
    throw new Error('Tauri API not configured');
  },
  getCartInfo: async () => {
    throw new Error('Tauri API not configured');
  },
};