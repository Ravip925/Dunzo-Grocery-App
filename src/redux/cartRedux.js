import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const itemInCart = state.products.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.Qnt++;
        let totalPrice = 0
        state.products.forEach(item => {
          totalPrice += item.productPrice * item.Qnt
        })
        state.total = totalPrice;
      } else {
        state.products.push({ ...action.payload, Qnt: 1 });
        state.total += action.payload.productPrice;
        state.quantity += 1;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      item.Qnt++;
      state.total += (item.productPrice);
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      if (item.Qnt === 1) {
        item.Qnt = 1;


      } else {
        item.Qnt--;
        state.total -= (item.productPrice);
      }
    },
    removeItem: (state, action) => {
      state.total -= (action.payload.productPrice * action.payload.Qnt);
      const removeItem = state.products.filter((item) => item._id !== action.payload._id);
      state.products = removeItem;
      state.quantity--;

    },

  },
});

export const { addProduct, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
