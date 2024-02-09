import { createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types/reducerTypes/main.types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: MainState = {
  alreadyOnboard: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setAlreadyOnboard(state: MainState, action: PayloadAction<boolean>) {
      state.alreadyOnboard = action.payload;
    },
  },
});

export const mainReducer = mainSlice.reducer;

export const { setAlreadyOnboard } = mainSlice.actions;
