import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { ApiError, ApiResponse } from '@/types';

class ApiClient {
    private axiosInstance: AxiosInstance;
    private useMockApi: boolean;

    constructor() {
        this.useMockApi = env.useMockApi;

        this.axiosInstance = axios.create({
            baseURL: env.apiBaseUrl,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use(
            this.handleRequest.bind(this),
            this.handleRequestError.bind(this)
        );

        this.axiosInstance.interceptors.response.use(
            this.handleResponse.bind(this),
            this.handleResponseError.bind(this)
        );
    }

    private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const token = this.getAccessToken();
        
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }

    private handleRequestError(error: AxiosError): Promise<AxiosError> {
        return Promise.reject(error);
    }

    private handleResponse(response: AxiosResponse): AxiosResponse {
        return response;
    }

    private async handleResponseError(error: AxiosError): Promise<never> {
        if (error.response?.status === 401) {
            const refreshToken = this.getRefreshToken();
            
            if (refreshToken && !error.config?.url?.includes('/auth/refresh')) {
                try {
                    const newToken = await this.refreshAccessToken(refreshToken);
                    
                    if (newToken && error.config) {
                        error.config.headers.Authorization = `Bearer ${newToken}`;
                        return this.axiosInstance.request(error.config);
                    }
                } catch {
                    this.clearTokens();
                    window.location.href = '/signin';
                }
            } else {
                this.clearTokens();
                window.location.href = '/signin';
            }
        }

        const apiError: ApiError = {
            success: false,
            message: (error.response?.data as { message?: string })?.message || error.message || 'An unexpected error occurred',
            statusCode: error.response?.status,
            errors: (error.response?.data as { errors?: Record<string, string[]> })?.errors,
        };

        return Promise.reject(apiError);
    }

    private getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    private getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    private clearTokens(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    private async refreshAccessToken(refreshToken: string): Promise<string | null> {
        try {
            const response = await axios.post(
                `${env.apiBaseUrl}/auth/refresh`,
                { refreshToken }
            );
            
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            return accessToken;
        } catch {
            return null;
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config);
        return response.data;
    }

    public setUseMockApi(useMock: boolean): void {
        this.useMockApi = useMock;
    }

    public isUsingMockApi(): boolean {
        return this.useMockApi;
    }
}

export const apiClient = new ApiClient();
export default apiClient;

