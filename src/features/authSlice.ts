/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../components/types/AuthStateType';

const initialState: AuthState = {
  authorized: localStorage.getItem('authorized') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.authorized = true;
      localStorage.setItem('authorized', 'true');
    },
    logout(state) {
      state.authorized = false;
      localStorage.removeItem('authorized');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
