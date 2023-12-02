import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  avatar: "",
  nickname: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.accessToken = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setNick: (state, action) => {
      state.nickname = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setLogin, setAvatar, setNick, setUserId } = authSlice.actions;
