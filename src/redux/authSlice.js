import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  allowShare: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsera: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUsera, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;
