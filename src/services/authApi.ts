import apiClient from './apiClient';
import { API_CONFIG } from '@/config/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Auth API
export const authApi = {
  // Login
  login: async (data: LoginRequest): Promise<User> => {
    // For demo purposes, return mock data
    // In a real app, this would be:
    // const response = await apiClient.post<AuthResponse>(`${API_CONFIG.ENDPOINTS.LOGIN}`, data);
    // return response.data;

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: 'Nguyễn Văn A',
      email: data.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };
    
    return mockUser;
  },

  // Register
  register: async (data: RegisterRequest): Promise<User> => {
    // For demo purposes, return mock data
    // In a real app, this would be:
    // const response = await apiClient.post<AuthResponse>(`${API_CONFIG.ENDPOINTS.REGISTER}`, data);
    // return response.data;

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: data.name,
      email: data.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };
    
    return mockUser;
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    // For demo purposes, just retrieve from localStorage
    // In a real app, this would verify the token with the server:
    // const response = await apiClient.get<User>(`${API_CONFIG.ENDPOINTS.ME}`);
    // return response.data;
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  }
};
