import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParams } from '../constants/types';
import { loadLastSearch } from '../helpers/helpers';

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    firstPage: true,
    lastPage: false,
    pageNumber: 0,
    pageSize: Number(QueryParams.defaultPageSize),
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
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { prevPage, nextPage, setPageSize, setUid, setQuery } =
  searchSlice.actions;

export default searchSlice.reducer;
