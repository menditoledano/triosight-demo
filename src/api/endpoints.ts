export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },
    PATIENTS: {
        LIST: '/patients',
        GET: (id: string) => `/patients/${id}`,
        CREATE: '/patients',
        UPDATE: (id: string) => `/patients/${id}`,
        DELETE: (id: string) => `/patients/${id}`,
        UPDATE_STRATEGY: (id: string) => `/patients/${id}/strategy`,
    },
    METRICS: {
        GET: (patientId: string) => `/patients/${patientId}/metrics`,
        UPDATE: (patientId: string) => `/patients/${patientId}/metrics`,
    },
} as const;

