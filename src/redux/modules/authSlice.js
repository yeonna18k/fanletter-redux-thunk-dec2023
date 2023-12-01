import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setLogin } = authSlice.actions;
