import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = { value: {} }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
})
export const { setUser } = userSlice.actions
export default userSlice.reducer
