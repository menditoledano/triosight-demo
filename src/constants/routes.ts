export const ROUTES = {
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },
  DASHBOARD: '/dashboard',
  PATIENT: {
    LIST: '/patients',
    DETAILS: '/patient/:id',
    CARD: '/patient-card',
  },
  STATISTICS: '/statistics',
  SETTINGS: '/settings',
} as const;