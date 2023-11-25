import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './api';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () => configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type TStoreState = ReturnType<typeof makeStore>;
export type TStoreDispatch = ReturnType<TStoreState["getState"]>;;
export type TReducer = TStoreState["dispatch"];;

export const useAppDispatch = () => useDispatch<TReducer>();
export const useAppSelector: TypedUseSelectorHook<TStoreState> = useSelector;

// const env = process.env.NODE_ENV;
// export const wrapper = createWrapper<TStoreState>(makeStore, { debug: env === "development" });
export const wrapper = createWrapper<TStoreState>(makeStore, { debug: false });
