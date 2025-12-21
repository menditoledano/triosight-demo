import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { storage } from '@/utils/storage';
import { User } from '@/types';
import { AuthFormData } from '@/types/auth.types';
import { ROUTES } from '@/constants/routes';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signIn: (data: AuthFormData) => Promise<void>;
    signUp: (data: AuthFormData) => Promise<void>;
    signOut: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            const cachedUser = storage.getUser<User>();
            const hasToken = !!storage.getAccessToken();

            if (cachedUser && hasToken) {
                setUser(cachedUser);
            } else {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            storage.clearTokens();
            storage.clearUser();
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = useCallback(async (data: AuthFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const { user: authenticatedUser } = await authService.signIn(data);
            setUser(authenticatedUser);
            navigate(ROUTES.DASHBOARD);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const signUp = useCallback(async (data: AuthFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const { user: newUser } = await authService.signUp(data);
            setUser(newUser);
            navigate(ROUTES.DASHBOARD);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const signOut = useCallback(async () => {
        try {
            await authService.signOut();
            setUser(null);
            navigate(ROUTES.AUTH.SIGN_IN);
        } catch (err) {
            console.error('Sign out error:', err);
        }
    }, [navigate]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

