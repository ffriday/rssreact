import { useGetItemQuery, useAddSearchMutation } from './api';
import searchReducer, {
  prevPage,
  nextPage,
  setPageSize,
  setUid,
  setQuery,
  setPageParams,
  setPage,
} from './searchSlice';
import {
  store,
  useAppDispatch,
  useAppSelector,
  TStoreState,
  TStoreDispatch,
  TReducer,
} from './store';

export {
  store,
  useGetItemQuery,
  useAddSearchMutation,
  searchReducer,
  useAppDispatch,
  useAppSelector,
  prevPage,
  nextPage,
  setPageSize,
  setUid,
  setQuery,
  setPageParams,
  setPage,
};
export type { TStoreState, TStoreDispatch, TReducer };
