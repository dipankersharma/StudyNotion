import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? localStorage.getItem("totalItems")
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already in cart");
        return;
      }
      // Add the course to the cart
      state.cart.push(course);

      // Update the total, totalItems, and save the cart to localStorage
      state.total += course.price;
      state.totalItems++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", state.total);
      localStorage.setItem("totalItems", state.totalItems);
      toast.success("Course added to cart");
    },
    removeToCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index > 0) {
        state.total -= state.cart[index].price;
        state.totalItems--;
        state.cart.splice(index, 1);
        // update local storage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        toast.success("Course removed from cart");
      }
    },
    resetCart: (state, action) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Update to localstorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
