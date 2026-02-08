export const ROUTES = {
  HOME: '/',
  MATERIALS: '/materials',
  MATERIAL_DETAIL: '/materials/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  APPLICATIONS: '/applications',
  APPLICATION_DETAIL: '/applications/:id',
  CART: '/cart',
  ADMIN: '/admin',
};

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: 'Главная',
  MATERIALS: 'Материалы',
  MATERIAL_DETAIL: 'Материал',
  LOGIN: 'Вход',
  REGISTER: 'Регистрация',
  PROFILE: 'Профиль',
  APPLICATIONS: 'Заявки',
  APPLICATION_DETAIL: 'Заявка',
  CART: 'Корзина',
  ADMIN: 'Админ-панель',
};