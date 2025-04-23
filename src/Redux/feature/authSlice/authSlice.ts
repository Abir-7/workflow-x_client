import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  userId: string;
  userRole: string;
  userEmail: string;
}

interface AuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUserData: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logoutUserData } = authSlice.actions;
export default authSlice.reducer;
