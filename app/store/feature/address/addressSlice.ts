// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {LOCAL_KEYS} from '../../../utils/local-storage';
// import {api_getAddresses} from '../../../api/address';
// import {Address} from '../../../types/Address';

// interface State {
//   zipCode: string | null;
//   addressList: Address[];
//   loading: boolean;
//   error: string | null;
//   selectedAddress: null | Address;
// }

// const initialState: State = {
//   zipCode: null,
//   addressList: [],
//   loading: false,
//   error: null,
//   selectedAddress: null,
// };

// export const fetchAddressList = createAsyncThunk(
//   'address/fetchAddressList',
//   async (data: {token: string}, {rejectWithValue}) => {
//     try {
//       const res = await api_getAddresses(data.token);
//       return res;
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to fetch addresses');
//     }
//   },
// );

// export const addressSlice = createSlice({
//   name: 'address',
//   initialState,
//   reducers: {
//     setZipCode: (state, action: PayloadAction<string>) => {
//       state.zipCode = action.payload;

//       AsyncStorage.setItem(LOCAL_KEYS.zipcode, action.payload);
//     },
//     setSelectedAddress: (state, action: PayloadAction<any>) => {
//       state.selectedAddress = action.payload;
//       state.zipCode = action.payload?.zipcode || null;
//       AsyncStorage.setItem(LOCAL_KEYS.zipcode, action.payload?.zipcode);
//       AsyncStorage.setItem(
//         LOCAL_KEYS.selectedAddress,
//         JSON.stringify(action.payload),
//       );
//     },
//     removeAddressData: state => {
//       AsyncStorage.removeItem(LOCAL_KEYS.selectedAddress);
//       state.selectedAddress = null;
//       state.addressList = [];
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchAddressList.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchAddressList.fulfilled,
//         (state, action: PayloadAction<any[]>) => {
//           state.addressList = action.payload;
//           state.loading = false;

//           // // Default Address
//           // if (!state.selectedAddress && action.payload.length > 0) {
//           //   state.selectedAddress = action.payload[0];
//           //   state.zipCode = action.payload[0].zipcode;
//           //   AsyncStorage.setItem(LOCAL_KEYS.zipcode, action.payload[0].zipcode);
//           // }
//         },
//       )
//       .addCase(fetchAddressList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const {setZipCode, setSelectedAddress, removeAddressData} =
//   addressSlice.actions;

// export default addressSlice.reducer;
