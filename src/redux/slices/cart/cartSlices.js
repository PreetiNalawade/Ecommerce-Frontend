import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//intialState
const initialState = {
  cartItems: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//add product cart
export const addOrderToCartAction = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    //push to storage
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);
//get product cart items
export const getCartItemFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    return cartItems;
  }
);

//add product to cart
export const changeOrderItemQty = createAsyncThunk(
  "cart/change-item-qty",
  async ({ productId, qty }) => {
    console.log(productId, qty);
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newCartItems = cartItems?.map((item) => {
      if (item?._id?.toString() === productId?.toString()) {
        //get new price
        const newPrice = item?.price * qty;
        item.qty = +qty;
        item.totalPrice = newPrice;
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

//remove product from cart
export const removeOrderItemQty = createAsyncThunk(
  "cart/removeOrderItem",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newItems = cartItems?.filter((item) => item?._id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

//slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    //add to cart
    builder.addCase(addOrderToCartAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderToCartAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.isAdded = true;
    });
    builder.addCase(addOrderToCartAction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch cart items
    //add to cart
    builder.addCase(getCartItemFromLocalStorageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCartItemFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.isAdded = true;
      }
    );
    builder.addCase(
      getCartItemFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.isAdded = false;
        state.error = action.payload;
      }
    );
  },
});

//generate the reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;
