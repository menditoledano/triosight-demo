const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER: 'user',
    REMEMBER_ME: 'rememberMe',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

class StorageService {
    private getStorage(rememberMe?: boolean): Storage {
        return rememberMe ? localStorage : sessionStorage;
    }

    public setItem(key: StorageKey, value: string, rememberMe?: boolean): void {
        try {
            const storage = this.getStorage(rememberMe);
            storage.setItem(key, value);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    public getItem(key: StorageKey): string | null {
        try {
            return localStorage.getItem(key) || sessionStorage.getItem(key);
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }

    public removeItem(key: StorageKey): void {
        try {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }

    public clear(): void {
        try {
            localStorage.clear();
            sessionStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }

    public setTokens(accessToken: string, refreshToken: string, rememberMe?: boolean): void {
        this.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken, rememberMe);
        this.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken, rememberMe);
    }

    public getAccessToken(): string | null {
        return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    public getRefreshToken(): string | null {
        return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    public clearTokens(): void {
        this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    public setUser(user: unknown, rememberMe?: boolean): void {
        this.setItem(STORAGE_KEYS.USER, JSON.stringify(user), rememberMe);
    }

    public getUser<T>(): T | null {
        const user = this.getItem(STORAGE_KEYS.USER);
        if (!user) return null;
        
        try {
            return JSON.parse(user) as T;
        } catch {
            return null;
        }
    }

    public clearUser(): void {
        this.removeItem(STORAGE_KEYS.USER);
    }
}

export const storage = new StorageService();
export { STORAGE_KEYS };

