// src/hooks/useAuth.ts

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // seu cliente axios configurado
import {
  AuthContextData,
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../types/auth';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega o usuário salvo no AsyncStorage ao inicializar
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem('@app:user');
      const storedToken = await AsyncStorage.getItem('@app:token');

      if (storedUser && storedToken) {
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);

      // Exemplo: API retorna algo como { user: {...}, token: '...', userPic: 'https://...' }
      const userWithPic = {
        ...data.user,
        image: data.user.image || data.userPic || '', // garante fallback do campo da API
      };

      await AsyncStorage.setItem('@app:user', JSON.stringify(userWithPic));
      await AsyncStorage.setItem('@app:token', data.token);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(userWithPic);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      const userWithPic = {
        ...response.data.user,
        image: response.data.user.image || response.data.userPic || '',
      };

      await AsyncStorage.setItem('@app:user', JSON.stringify(userWithPic));
      await AsyncStorage.setItem('@app:token', response.data.token);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      setUser(userWithPic);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove(['@app:user', '@app:token']);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        register,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
