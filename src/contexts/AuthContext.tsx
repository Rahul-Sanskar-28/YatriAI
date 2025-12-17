import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import api from '../lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const response = await api.getMe();
          if (response.success && response.data) {
            setUser({
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              role: response.data.role,
              avatar: response.data.avatar,
              isVerified: response.data.isVerified,
              preferences: response.data.preferences ? {
                interests: response.data.preferences.interests || [],
                budget: response.data.preferences.budget?.replace('_', '-') || 'mid-range',
                travelStyle: response.data.preferences.travelStyle || 'solo',
                duration: response.data.preferences.duration || 3
              } : undefined
            });
          }
        } catch (error) {
          // Token is invalid, clear it
          api.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: string) => {
    const response = await api.login(email, password, role);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Login failed. Please check your credentials.');
    }

    const userData = response.data.user;
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar,
      isVerified: userData.isVerified,
      preferences: userData.preferences ? {
        interests: userData.preferences.interests || [],
        budget: userData.preferences.budget?.replace('_', '-') || 'mid-range',
        travelStyle: userData.preferences.travelStyle || 'solo',
        duration: userData.preferences.duration || 3
      } : undefined
    });
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    const response = await api.register(email, password, name, role);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Registration failed. Please try again.');
    }

    const userData = response.data.user;
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar,
      isVerified: userData.isVerified,
      preferences: userData.preferences ? {
        interests: userData.preferences.interests || [],
        budget: userData.preferences.budget?.replace('_', '-') || 'mid-range',
        travelStyle: userData.preferences.travelStyle || 'solo',
        duration: userData.preferences.duration || 3
      } : undefined
    });
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
