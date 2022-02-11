import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import expandedSlice from "./expandedSlice";
import folderSlice from "./folderSlice";

export const store = configureStore({
  reducer: {
    api: apiSlice,
    folder: folderSlice,
    expanded: expandedSlice,
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
