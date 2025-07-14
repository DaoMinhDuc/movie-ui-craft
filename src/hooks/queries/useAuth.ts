import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, User, LoginRequest, RegisterRequest } from '@/services/authApi';
import { authKeys } from '@/hooks/queryKeys';

// Get current user query
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authApi.getCurrentUser,
  });
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (user: User) => {
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update queries
      queryClient.setQueryData(authKeys.currentUser(), user);
      
      // Invalidate queries that might depend on authentication
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (user: User) => {
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update queries
      queryClient.setQueryData(authKeys.currentUser(), user);
      
      // Invalidate queries that might depend on authentication
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    },
    onSuccess: () => {
      // Clear user from cache
      queryClient.setQueryData(authKeys.currentUser(), null);
      
      // Invalidate queries that might depend on authentication
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
};
