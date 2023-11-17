import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParams } from '../constants/types';

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    firstPage: true,
    lastPage: false,
    pageNumber: 1,
    pageSize: Number(QueryParams.defaultPageSize),
    query: '',
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
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
  },
});

export const { prevPage, nextPage, setPageSize, setUid } = searchSlice.actions;

export default searchSlice.reducer;
