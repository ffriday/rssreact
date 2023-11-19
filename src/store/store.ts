import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './searchSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    searchParams: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type TStoreState = ReturnType<typeof store.getState>;
export type TStoreDispatch = typeof store.dispatch;
export type TReducer = typeof store;

export const useAppDispatch: () => TStoreDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TStoreState> = useSelector;
