import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/userSlice"
import memoReducer from "./features/memoSlice"
import barReducer from "./features/barSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
    bar: barReducer,
  },
})
