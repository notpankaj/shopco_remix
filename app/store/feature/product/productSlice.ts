import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedFilterType = {
  category?: string | null;
  color?: string | null;
  size?: string | null;
  priceMin?: number | null;
  priceMax?: number | null;
};
type InitialStateType = {
  filter: SelectedFilterType;
};

const DEFAULT_FILTERS = {
  category: null,
  color: null,
  size: null,
  priceMin: null,
  priceMax: null,
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
    resetFilters: (state) => {
      state.filter = DEFAULT_FILTERS;
    },
  },
});

export const { resetFilters, setFilters } = productSlice.actions;

export default productSlice.reducer;
