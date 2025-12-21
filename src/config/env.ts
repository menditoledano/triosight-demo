export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    appName: import.meta.env.VITE_APP_NAME || 'Triosight',
    useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true' || true,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
} as const;

