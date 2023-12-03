import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries, TFormData } from '../constants';

const initialState: TFormData[] = [];

const componentSlice = createSlice({
  name: 'componentSlice',
  initialState,
  reducers: {
    updateData(state, action: PayloadAction<TFormData>) {
      state.unshift(action.payload);
    },
  },
});

const countrySlice = createSlice({
  name: 'countrySlice',
  initialState: {
    countries: countries,
  },
  reducers: {},
});

export const { reducer: componentReducer } = componentSlice;
export const { reducer: countryReducer } = countrySlice;

export const { updateData: updateComponentData } = componentSlice.actions;
