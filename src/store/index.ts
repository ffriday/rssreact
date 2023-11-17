import { api, useGetItemQuery, useAddSearchMutation } from './api';
import searcReducer, {
  prevPage,
  nextPage,
  setPageSize,
  setUid,
} from './searchSlice';
import { store, useAppDispatch, useAppSelector } from './store';

export {
  api,
  store,
  useGetItemQuery,
  useAddSearchMutation,
  searcReducer,
  useAppDispatch,
  useAppSelector,
  prevPage,
  nextPage,
  setPageSize,
  setUid,
};
