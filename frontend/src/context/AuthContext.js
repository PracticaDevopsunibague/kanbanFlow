import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setError(null);
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        return;
      }
      
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('authToken');
      setUser(null);
      setError('Sesión expirada');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      const { user: userData, token } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(userData);
      return response.data;
    } catch (error) {
      setError('Credenciales inválidas');
      throw error;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      const { user: newUser, token } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(newUser);
      return response.data;
    } catch (error) {
      setError('Error al registrar usuario');
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      setError(null);
    }
  }, []);

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated: !!user
  }), [user, login, register, logout, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};