import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categorySlices";
import brandsReducer from "../slices/categories/brandSlices";
import colorsReducer from "../slices/categories/colorSlices";
import cartReducer from "../slices/cart/cartSlices";
import couponsReducer from "../slices/coupons/couponSlices";
import ordersReducer from "../slices/orders/ordersSlices";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
    carts: cartReducer,
    coupons: couponsReducer,
    orders: ordersReducer,
  },
});

export default store;
