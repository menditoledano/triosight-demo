import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { mockApiService } from '@/api/mocks';
import { storage } from '@/utils/storage';
import { ApiResponse, TokenResponse, User } from '@/types';
import { AuthFormData } from '@/types/auth.types';
import { env } from '@/config/env';

interface AuthResponse {
    token: TokenResponse;
    user: User;
}

class AuthService {
    private useMockApi = env.useMockApi;

    async signIn(data: AuthFormData): Promise<{ user: User; token: TokenResponse }> {
        try {
            let response: ApiResponse<AuthResponse>;

            if (this.useMockApi) {
                response = await mockApiService.login(data.email, data.password);
            } else {
                response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
                    email: data.email,
                    password: data.password,
                });
            }

            if (response.success && response.data) {
                const { token, user } = response.data;
                storage.setTokens(token.accessToken, token.refreshToken, data.rememberMe);
                storage.setUser(user, data.rememberMe);
                return { user, token };
            }

            throw new Error('Authentication failed');
        } catch (error) {
            throw error;
        }
    }

    async signUp(data: AuthFormData): Promise<{ user: User; token: TokenResponse }> {
        try {
            let response: ApiResponse<AuthResponse>;

            if (this.useMockApi) {
                response = await mockApiService.register(
                    data.name || '',
                    data.email,
                    data.password
                );
            } else {
                response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                });
            }

            if (response.success && response.data) {
                const { token, user } = response.data;
                storage.setTokens(token.accessToken, token.refreshToken, data.rememberMe);
                storage.setUser(user, data.rememberMe);
                return { user, token };
            }

            throw new Error('Registration failed');
        } catch (error) {
            throw error;
        }
    }

    async signOut(): Promise<void> {
        try {
            if (!this.useMockApi) {
                await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            storage.clearTokens();
            storage.clearUser();
        }
    }

    async getCurrentUser(): Promise<User | null> {
        const cachedUser = storage.getUser<User>();
        if (cachedUser) return cachedUser;

        try {
            if (this.useMockApi) {
                return null;
            }

            const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
            if (response.success && response.data) {
                storage.setUser(response.data);
                return response.data;
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    isAuthenticated(): boolean {
        return !!storage.getAccessToken();
    }
}

export const authService = new AuthService();