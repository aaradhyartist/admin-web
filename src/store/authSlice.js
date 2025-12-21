import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken:
    localStorage.getItem(
      `${import.meta.env.VITE_APP_TOKEN_PREFICS}_accessToken`
    ) || null,
  refreshToken:
    localStorage.getItem(
      `${import.meta.env.VITE_APP_TOKEN_PREFICS}_refreshToken`
    ) || null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem(
        `${import.meta.env.VITE_APP_TOKEN_PREFICS}_refreshToken`,
        action.payload.refreshToken
      );
      localStorage.setItem(
        `${import.meta.env.VITE_APP_TOKEN_PREFICS}_accessToken`,
        action.payload.accessToken
      );
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.setItem(
        `${import.meta.env.VITE_APP_TOKEN_PREFICS}_refreshToken`,
        ""
      );
      localStorage.setItem(
        `${import.meta.env.VITE_APP_TOKEN_PREFICS}_accessToken`,
        ""
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
