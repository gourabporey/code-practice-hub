import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todoSlice";

export const todoStore = configureStore({
  reducer: todoSlice
});
