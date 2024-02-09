import {
  LoginBodyResquest,
  RegisterBodyResquest,
  ResetPasswordBodyRequest,
  SendVerificationBodyResquest,
} from '../types/auth.types';
import axiosClient from './axiosClient';

export const authApi = {
  Register(body: RegisterBodyResquest) {
    return axiosClient.post('/auth/register', body);
  },
  Login(body: LoginBodyResquest) {
    return axiosClient.post('/auth/login', body);
  },
  SendVerificationCode(body: SendVerificationBodyResquest) {
    return axiosClient.post('/auth/verification', body);
  },
  ResetPassword(body: ResetPasswordBodyRequest) {
    return axiosClient.post('/auth/reset-password', body);
  },
};
