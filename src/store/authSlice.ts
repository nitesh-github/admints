import { createSlice } from "@reduxjs/toolkit";

interface UserDetails {
    id: number;
    name: string;
    email: string;
  }

  interface AuthState {
    isAuthenticated: boolean;
    user: UserDetails | null;
    token : string | null;
  }

  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload?.data;
        state.token = action.payload?.token;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
      },
    },
  });

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;