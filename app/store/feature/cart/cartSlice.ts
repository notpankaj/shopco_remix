// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createSlice} from '@reduxjs/toolkit';
// import {LOCAL_KEYS} from '../../../utils/local-storage';

// const getCartItemIndex = (
//   cartItems: any[],
//   productId: number,
//   variantId: number,
// ): number => {
//   return cartItems.findIndex(
//     item => item.product_id === productId && item.variant_id === variantId,
//   );
// };

// export const getCartItem = (
//   cartItems: any[],
//   productId: number,
//   variantId: number,
// ): any | null => {
//   const item = cartItems.find(
//     item => item.product_id === productId && item.variant_id === variantId,
//   );
//   return item || null;
// };

// const initialState: {items: any[]} = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart: (state, action) => {
//       console.log(action.payload);
//       const oldItemIndex = getCartItemIndex(
//         state.items,
//         action.payload.product_id,
//         action.payload.variant_id,
//       );

//       console.log(oldItemIndex, 'oldItemIndex');

//       if (oldItemIndex < 0) {
//         const newItem = {...action.payload, qty: 1};
//         state.items = [...state.items, newItem];
//       } else {
//         const oldItem = state.items[oldItemIndex];
//         const newItem = {...action.payload, qty: oldItem.qty + 1};
//         state.items.splice(oldItemIndex, 1, newItem);
//       }
//     },
//     updateItemInCart: (state, action) => {
//       console.log(action.payload);
//       const oldItemIndex = getCartItemIndex(
//         state.items,
//         action.payload.product_id,
//         action.payload.variant_id,
//       );
//       console.log(oldItemIndex, 'oldItemIndex');

//       if (oldItemIndex < 0) return;
//       const oldItem = state.items[oldItemIndex];
//       if (oldItem) {
//         console.log(oldItem, 'old');
//         //  remove
//         if (oldItem.qty <= 1) {
//           state.items = state.items.filter(
//             (_: any, index: number) => index !== oldItemIndex,
//           );
//           return;
//         }
//         // decrement
//         const newItem = {
//           ...oldItem,
//           qty: oldItem.qty - 1,
//         };
//         state.items.splice(oldItemIndex, 1, newItem);
//       }
//     },
//     setCart: (state, action) => {
//       state.items = action.payload;
//     },
//     clearCart: state => {
//       state.items = [];
//       AsyncStorage.removeItem(LOCAL_KEYS.cart);
//     },
//   },
// });

// export const {addItemToCart, updateItemInCart, setCart, clearCart} =
//   cartSlice.actions;

// export default cartSlice.reducer;

// // "variant_id": 12,
// // "product_id": 16,
// // "qty": 2,
// // "variant": {},
// // product
