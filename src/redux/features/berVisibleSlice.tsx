import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = { value: false }

export const barSlice = createSlice({
  name: "bar",
  initialState,
  reducers: {
    setBar: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
})
export const { setBar } = barSlice.actions
export default barSlice.reducer
