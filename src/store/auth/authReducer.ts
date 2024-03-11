import { createSlice } from '@reduxjs/toolkit/react';
import { AuthState, UserData } from '../../types/reducerTypes/auth.types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isAuthorized: false,
  storedEmail: '',
  userData: {
    username: '',
    email: '',
    photoUrl: '',
  },
};

const authSLice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setStoredEmail: (state: AuthState, action: PayloadAction<string>) => {
      state.storedEmail = action.payload;
    },
    setUserData: (state: AuthState, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});

export const authReducer = authSLice.reducer;

export const { setIsAuthorized, setStoredEmail, setUserData } =
  authSLice.actions;
