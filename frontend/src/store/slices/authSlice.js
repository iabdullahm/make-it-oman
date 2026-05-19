import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    checkAuth: (state) => state,
  },
});

export const { checkAuth } = authSlice.actions;
export default authSlice.reducer;
