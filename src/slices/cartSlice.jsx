import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? localStorage.getItem("totalItems")
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setToken } = cartSlice.actions;
export default cartSlice.reducer;
