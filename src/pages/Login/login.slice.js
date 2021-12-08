import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teacher: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.teacher = action.payload;
    },
  },
});

export const setUser = loginSlice.actions.setUser;

export const userSelector = (state) => state.login.teacher;
export const isAuthenticatedSelector = (state) => !!state.login.teacher;

export default loginSlice.reducer;
