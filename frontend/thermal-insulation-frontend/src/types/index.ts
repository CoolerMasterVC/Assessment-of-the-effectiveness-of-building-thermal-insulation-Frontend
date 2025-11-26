// src/types/index.ts
export type Material = {
  id: number;
  name: string;
  description: string;
  price_per_m2: number;
  lambda: number;
  thickness: number;
  image_url: string;
  status: string;
  created_at: string;
};

export type MaterialsFilter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
};

// Экспортируем все типы через один объект для удобства
export type { Material as IMaterial, MaterialsFilter as IMaterialsFilter };