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
    logintime : number;
  }

  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    logintime: 0,
  };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload?.data;
        state.token = action.payload?.token;
        state.logintime = Date.now();
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
      },
    },
  });

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;