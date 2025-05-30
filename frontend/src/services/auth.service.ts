import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export interface LoginRequest {
  SoDienThoai: string;
  MatKhau: string;
}

export interface RegisterRequest {
  TenKhachHang: string;
  SoDienThoai: string;
  MatKhau: string;
  DiaChi?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: any;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getCurrentUser = (): any => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

 