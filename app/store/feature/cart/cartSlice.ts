import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_KEYS } from "~/constant";

export type CartItemObj = {
  product_id: string;
  variant_id: string;
  product: any;
  qty: number;
};

const getCartItemIndex = (
  cartItems: any[],
  productId: string,
  variantId: string
): number => {
  return cartItems.findIndex(
    (item) => item.product_id === productId && item.variant_id === variantId
  );
};

export const getCartItem = (
  cartItems: CartItemObj[],
  productId: string,
  variantId: string
): any | null => {
  const item = cartItems.find(
    (item) => item.product_id === productId && item.variant_id === variantId
  );
  return item || null;
};

const initialState: { items: any[] } = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Omit<CartItemObj, "qty">>) => {
      //   console.log(action.payload);
      const oldItemIndex = getCartItemIndex(
        state.items,
        action.payload.product_id,
        action.payload.variant_id
      );

      //   console.log(oldItemIndex, "oldItemIndex");

      if (oldItemIndex < 0) {
        const newItem = { ...action.payload, qty: 1 };
        state.items = [...state.items, newItem];
      } else {
        const oldItem = state.items[oldItemIndex];
        const newItem = { ...action.payload, qty: oldItem.qty + 1 };
        state.items.splice(oldItemIndex, 1, newItem);
      }
    },
    removeItemInCart: (
      state,
      action: PayloadAction<Omit<CartItemObj, "qty">>
    ) => {
      //   console.log(action.payload);
      const oldItemIndex = getCartItemIndex(
        state.items,
        action.payload.product_id,
        action.payload.variant_id
      );
      //   console.log(oldItemIndex, "oldItemIndex");

      if (oldItemIndex < 0) return;
      const oldItem = state.items[oldItemIndex];
      if (oldItem) {
        //  remove
        if (oldItem.qty <= 1) {
          state.items = state.items.filter(
            (_: any, index: number) => index !== oldItemIndex
          );
          return;
        }
        // decrement
        const newItem = {
          ...oldItem,
          qty: oldItem.qty - 1,
        };
        state.items.splice(oldItemIndex, 1, newItem);
      }
    },
    setCart: (state, action: PayloadAction<CartItemObj[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(LOCAL_KEYS.cart);
    },
  },
});

export const { addItemToCart, removeItemInCart, setCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// CART ITEM
// "variant_id": 12,
// "product_id": 16,
// "qty": 2,
// product
