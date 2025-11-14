import type { Material } from '../types';

// Для mock данных используем изображение из public папки
const DEFAULT_IMAGE = '/images/default-material.jpg';

export const MATERIALS_MOCK: Material[] = [
  {
    id: 1,
    name: "Минеральная вата",
    description: "Эффективный утеплитель на основе минеральных волокон с отличными теплоизоляционными свойствами",
    price_per_m2: 450,
    lambda: 0.039,
    thickness: 0.05,
    image_url: DEFAULT_IMAGE, // Используем локальную картинку
    status: "действует",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Пенополистирол",
    description: "Легкий и прочный теплоизоляционный материал с низкой теплопроводностью",
    price_per_m2: 320,
    lambda: 0.035,
    thickness: 0.03,
    image_url: DEFAULT_IMAGE,
    status: "действует",
    created_at: "2024-01-16T11:00:00Z"
  },
  {
    id: 3,
    name: "Экструдированный пенополистирол",
    description: "Влагостойкий утеплитель с высокой прочностью и стабильными характеристиками",
    price_per_m2: 580,
    lambda: 0.031,
    thickness: 0.04,
    image_url: DEFAULT_IMAGE,
    status: "действует",
    created_at: "2024-01-17T12:00:00Z"
  },
  // ... остальные материалы
];