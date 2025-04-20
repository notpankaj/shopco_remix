import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MAX_PRODUCT_PRICE } from "~/constant";

export type SelectedFilterType = {
  search?: string;
  category?: string | null;
  color?: string | null;
  size?: string | null;
  dressStyle?: string | null;
  maxPrice?: number | null;
};
type InitialStateType = {
  filter: SelectedFilterType;
};

const DEFAULT_FILTERS = {
  search: "",
  category: null,
  color: null,
  size: null,
  maxPrice: 0,
  dressStyle: null,
};

const initialState: InitialStateType = {
  filter: DEFAULT_FILTERS,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SelectedFilterType>) => {
      state.filter = {
        ...DEFAULT_FILTERS,
        ...action.payload,
      };
    },
    updateFilters: (state, action: PayloadAction<SelectedFilterType>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filter = DEFAULT_FILTERS;
    },
  },
});

export const { resetFilters, setFilters, updateFilters } = productSlice.actions;

export default productSlice.reducer;
