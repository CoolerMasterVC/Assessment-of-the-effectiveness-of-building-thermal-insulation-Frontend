export type User = {
  id: number;
  login: string;
  password?: string;
  is_moderator: boolean;
  created_at: string;
};

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

export type MaterialsApplication = {
  id: number;
  status: 'черновик' | 'удалён' | 'сформирован' | 'завершён' | 'отклонён';
  creator_id: number;
  total_area: number;
  indoor_temp: number;
  outdoor_temp: number;
  total_savings: number;
  created_at: string;
  submitted_at: string | null;
  completed_at: string | null;
  moderator_id: number | null;
  creator: User;
  moderator: User | null;
  materials: ApplicationMaterial[];
};

export type ApplicationMaterial = {
  application_id: number;
  material_id: number;
  area: number;
  created_at: string;
  material: Material;
};

export type LoginCredentials = {
  login: string;
  password: string;
};

export type RegisterData = {
  login: string;
  password: string;
};

export type UpdateUserData = {
  login?: string;
  password?: string;
};

export type MaterialsFilter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
};