import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  categories: any[];
  sizes: any[];
  dressStyle: any[];
  colors: any[];
}

const initialState: AppState = {
  categories: [],
  sizes: [],
  dressStyle: [],
  colors: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCommonData: (
      state,
      action: PayloadAction<{
        categories: any[];
        sizes: any[];
        dressStyle: any[];
        colors: any[];
      }>
    ) => {
      state.categories = action.payload.categories;
      state.sizes = action.payload.sizes;
      state.colors = action.payload.colors;
      state.dressStyle = action.payload.dressStyle;
    },
  },
});

export const { setCommonData } = appSlice.actions;

export default appSlice.reducer;
