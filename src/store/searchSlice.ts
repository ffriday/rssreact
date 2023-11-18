import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadLastSearch, loadPaseSize } from '../helpers/helpers';

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    firstPage: true,
    lastPage: false,
    pageNumber: 0,
    pageSize: Number(loadPaseSize()),
    query: loadLastSearch(),
    uid: '',
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

export default searchSlice.reducer;
