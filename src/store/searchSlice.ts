import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadLastSearch, loadPaseSize } from '../helpers/helpers';
import { api } from './api';

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    firstPage: true,
    lastPage: false,
    pageNumber: 0,
    pageSize: Number(loadPaseSize()),
    query: loadLastSearch(),
    uid: new URL(window.location.href).searchParams.get('uid') || '',
    flags: {
      listLoading: false,
      itemLoading: false,
    },
  },
  reducers: {
    prevPage(state) {
      if (!state.firstPage) {
        state.pageNumber = state.pageNumber - 1;
      }
    },
    nextPage(state) {
      if (!state.lastPage) {
        state.pageNumber = state.pageNumber + 1;
      }
    },
    setPage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setPageParams(
      state,
      action: PayloadAction<{ first: boolean; last: boolean }>
    ) {
      state.firstPage = action.payload.first;
      state.lastPage = action.payload.last;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.addSearch.matchPending, (state) => {
      state.flags.listLoading = true;
      state.flags.itemLoading = true;
    }),
      builder.addMatcher(api.endpoints.addSearch.matchFulfilled, (state) => {
        state.flags.listLoading = false;
        state.flags.itemLoading = false;
      }),
      builder.addMatcher(api.endpoints.addSearch.matchRejected, (state) => {
        state.flags.listLoading = false;
        state.flags.itemLoading = false;
      });
  },
});

export const {
  prevPage,
  nextPage,
  setPageSize,
  setUid,
  setQuery,
  setPageParams,
  setPage,
} = searchSlice.actions;

export const { reducer } = searchSlice;
