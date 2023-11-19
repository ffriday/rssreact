import { useGetItemQuery, useAddSearchMutation } from './api';
import {
  reducer,
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
  reducer as searchReducer,
  useGetItemQuery,
  useAddSearchMutation,
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
