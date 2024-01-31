import { LoginBodyResquest, RegisterBodyResquest } from '../types/auth.types';
import axiosClient from './axiosClient';

export const authApi = {
  Register(body: RegisterBodyResquest) {
    return axiosClient.post('/auth/register', body);
  },
  Login(body: LoginBodyResquest) {
    return axiosClient.post('/auth/login', body);
  },
};
