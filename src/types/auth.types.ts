export interface RegisterBodyResquest {
  username: string;
  email: string;
  password: string;
}

export interface LoginBodyResquest {
  email: string;
  password: string;
}

export interface SendVerificationBodyResquest {
  email: string;
}

export interface ResetPasswordBodyRequest {
  email: string;
}
