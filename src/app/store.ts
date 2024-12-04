import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { AuthState } from '../components/types/AuthStateType';

export const store: EnhancedStore<{ auth: AuthState }> = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
