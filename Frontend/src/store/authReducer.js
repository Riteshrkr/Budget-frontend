import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:"",
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state){
        state.user = "";
    }
  }
});

export const { setLoading, setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;