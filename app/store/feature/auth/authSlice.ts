import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_KEYS } from "~/constant";
import { User } from "~/types/User";

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthPayload {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthPayload>) => {
      const { user, token } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem(LOCAL_KEYS.token, token);
      localStorage.setItem(LOCAL_KEYS.user, JSON.stringify(user));
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      const user = action.payload;
      const newUser = { ...state.user, ...user };
      state.user = newUser as User;
      localStorage.setItem(LOCAL_KEYS.user, JSON.stringify(newUser));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(LOCAL_KEYS.token);
      localStorage.removeItem(LOCAL_KEYS.user);
    },
  },
});

export const { setAuth, updateUser, logOut } = authSlice.actions;

export default authSlice.reducer;
