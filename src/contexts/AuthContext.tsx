
import React, { createContext, useContext } from 'react';
import { useCurrentUser, useLogin, useLogout, useRegister } from '@/hooks/queries/useAuth';
import type { User } from '@/services/authApi';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use React Query hooks
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const { mutateAsync: loginMutation, isPending: isLoadingLogin } = useLogin();
  const { mutateAsync: registerMutation, isPending: isLoadingRegister } = useRegister();
  const { mutateAsync: logoutMutation, isPending: isLoadingLogout } = useLogout();

  // Determine overall loading state
  const isLoading = isLoadingUser || isLoadingLogin || isLoadingRegister || isLoadingLogout;

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await loginMutation({ email, password });
    } catch (error) {
      throw new Error('Đăng nhập thất bại');
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      await registerMutation({ name, email, password });
    } catch (error) {
      throw new Error('Đăng ký thất bại');
    }
  };

  // Logout function
  const logout = () => {
    logoutMutation();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
