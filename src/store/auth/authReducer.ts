import { createSlice } from '@reduxjs/toolkit/react';
import { AuthState } from '../../types/reducerTypes/auth.types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isAuthorized: false,
};

const authSLice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
  },
});

export const authReducer = authSLice.reducer;

export const { setIsAuthorized } = authSLice.actions;
