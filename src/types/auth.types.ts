export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  rememberMe: boolean;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}