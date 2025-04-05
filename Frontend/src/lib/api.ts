import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RegisterResponse extends LoginResponse {}

// Auth API
export const auth = {
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
  register: async (data: { email: string; password: string; name: string }): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },
};

// Cargo API
export const cargo = {
  getAll: async () => {
    const response = await api.get('/cargo');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/cargo', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/cargo/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/cargo/${id}`);
  },
};

// Inventory API
export const inventory = {
  getAll: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/inventory', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/inventory/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/inventory/${id}`);
  },
};

// Waste API
export const waste = {
  getAll: async () => {
    const response = await api.get('/waste');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/waste', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/waste/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/waste/${id}`);
  },
}; 