// src/services/authService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // axios configurado com baseURL
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../types/auth';

// Chaves de armazenamento
const STORAGE_KEYS = {
  USER: '@MedicalApp:user',
  TOKEN: '@MedicalApp:token',
};

export const authService = {
  /**
   * Login via API
   */
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);

    // Garante compatibilidade com 'image' vindo da API
    const normalizedUser: User = {
      ...data.user,
      image: (data.user as any).image || (data as any).userPic || '',
    };

    // Persistência local
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(normalizedUser));
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, data.token);

    // Header padrão
    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    return { user: normalizedUser, token: data.token };
  },

  /**
   * Registro via API
   */
  async register(payload: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);

    const normalizedUser: User = {
      ...data.user,
      image: (data.user as any).image || (data as any).userPic || '',
    };

    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(normalizedUser));
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, data.token);

    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    return { user: normalizedUser, token: data.token };
  },

  /**
   * Logout local
   */
  async signOut(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    delete api.defaults.headers.Authorization;
  },

  /**
   * Recupera usuário armazenado localmente.
   * Se houver token, opcionalmente valida/atualiza com /auth/me.
   */
  async getStoredUser(options?: { refreshWithApi?: boolean }): Promise<User | null> {
    try {
      const [userJson, token] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
      ]);

      if (!userJson || !token) return null;

      const localUser: User = JSON.parse(userJson);

      // Reaplica token no axios
      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (options?.refreshWithApi) {
        // Atualiza snapshot do usuário (ex.: imagem alterada, role mudada, etc.)
        const { data } = await api.get<{ user: User }>('/auth/me');
        const normalizedUser: User = {
          ...data.user,
          image: (data.user as any).image || (localUser as any).image || '',
        };
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(normalizedUser));
        return normalizedUser;
      }

      return localUser;
    } catch (error) {
      console.error('Erro ao obter usuário armazenado:', error);
      return null;
    }
  },

  /**
   * Admin – lista todos usuários
   */
  async getAllUsers(): Promise<User[]> {
    const { data } = await api.get<User[]>('/users');
    return data.map((u) => ({ ...u, image: (u as any).image || '' }));
  },

  /**
   * Lista todos os médicos
   */
  async getAllDoctors(): Promise<User[]> {
    const { data } = await api.get<User[]>('/users/doctors');
    return data.map((u) => ({ ...u, image: (u as any).image || '' }));
  },

  /**
   * Lista todos os pacientes
   */
  async getPatients(): Promise<User[]> {
    const { data } = await api.get<User[]>('/users/patients');
    return data.map((u) => ({ ...u, image: (u as any).image || '' }));
  },

  /**
   * Inicialização (opcional): tenta reidratar token/usuário
   */
  async bootstrap({ refreshWithApi = false } = {}): Promise<User | null> {
    return this.getStoredUser({ refreshWithApi });
  },
};
