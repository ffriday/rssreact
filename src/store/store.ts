import { configureStore } from '@reduxjs/toolkit';
import { api, searcReducer } from './';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    searchParams: searcReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

type TStoreState = ReturnType<typeof store.getState>;
type TStoreDispatch = typeof store.dispatch;

export const useAppDispatch: () => TStoreDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TStoreState> = useSelector;
