import { configureStore } from '@reduxjs/toolkit';
import { componentReducer, countryReducer, updateReducer } from './';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    componentReducer,
    countryReducer,
    updateReducer,
  },
});

export type TStoreState = ReturnType<typeof store.getState>;
export type TStoreDispatch = typeof store.dispatch;
export type TReducer = typeof store;

export const useAppDispatch: () => TStoreDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TStoreState> = useSelector;
