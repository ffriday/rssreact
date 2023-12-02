import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries, TFormData } from '../constants';
import { FormNames } from '../constants/types';

const createFormSlice = (name: string) =>
  createSlice({
    name,
    initialState: {
      [FormNames.name]: '',
      [FormNames.age]: 0,
      [FormNames.email]: '',
      [FormNames.password]: '',
      [FormNames.country]: '',
      [FormNames.gender]: '',
      [FormNames.confirm]: '',
      [FormNames.image]: '',
      [FormNames.accept]: '',
    },
    reducers: {
      updateData(state, action: PayloadAction<TFormData>) {
        return { ...state, ...action.payload };
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

const componentSlice = createFormSlice('componentSlice');
const hookSlice = createFormSlice('hookSlice');

export const { reducer: componentReducer } = componentSlice;
export const { reducer: hookReducer } = hookSlice;
export const { reducer: countryReducer } = countrySlice;

export const { updateData: updateComponentData } = componentSlice.actions;
export const { updateData: updateHooktData } = hookSlice.actions;
