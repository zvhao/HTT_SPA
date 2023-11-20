import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.data = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = user.actions;

export default user.reducer;
