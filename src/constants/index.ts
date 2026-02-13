export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  USERS: '/dashboard/users',
  ANALYTICS: '/dashboard/analytics',
  REPORTS: '/dashboard/reports',
  // Public routes
  BUY: '/buy',
  BUY_DETAILS: '/buy/:id',
  SELL: '/sell',
  AUCTION: '/auction',
  ABOUT_US: '/about-us',
  CONTACT_US: '/contact-us',
} as const;

export const STORAGE_KEYS = {
  THEME: 'app_theme',
  USER: 'app_user',
  LANGUAGE: 'i18nextLng',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
