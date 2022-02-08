import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import apiSlice from '../features/apiSlice';

export const store = configureStore({
  reducer: {
    api: apiSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
