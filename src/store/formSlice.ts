import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TFormData = {
  name: string;
  age: number;
};

const createFormSlice = (name: string) =>
  createSlice({
    name,
    initialState: {
      name: '',
      age: 0,
    },
    reducers: {
      updateData(state, action: PayloadAction<TFormData>) {
        return { ...state, ...action.payload };
      },
    },
  });

const componentSlice = createFormSlice('componentSlice');
const hookSlice = createFormSlice('hookSlice');

export const { reducer: componentReducer } = componentSlice;
export const { reducer: hookReducer } = hookSlice;

export const { updateData: updateComponentData } = componentSlice.actions;
export const { updateData: updateHooktData } = hookSlice.actions;
