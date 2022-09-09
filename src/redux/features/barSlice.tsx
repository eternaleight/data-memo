import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = { value: true }

export const barSlice = createSlice({
  name: "bar",
  initialState,
  reducers: {
    setBar: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})
export const { setBar } = barSlice.actions
export default barSlice.reducer
