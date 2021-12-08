import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/Login/login.slice";

export const store = configureStore({
  reducer: {
    login: userReducer,
  },
});
