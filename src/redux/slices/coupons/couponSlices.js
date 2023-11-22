import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
//intialState
const initialState = {
  coupons: [],
  coupon: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create createCoupon action

export const createCouponAction = createAsyncThunk(
  "coupons/create",
  async (
    { code, discount, startDate, endDate },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // //fromData
      // const formData = new FormData();
      // formData.append("name", name);

      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Images
      const { data } = await axios.post(
        `${baseURL}/coupons`,
        {
          code,
          discount,
          startDate,
          endDate,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//get coupons action
export const fetchCouponsAction = createAsyncThunk(
  "coupons/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/coupons`);
      //console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get coupon action
export const fetchCouponAction = createAsyncThunk(
  "coupons/single",
  async (code, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/coupons/single?code=${code}`,
        { code }
      );
      //console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all
    builder.addCase(fetchCouponsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload;
    });
    builder.addCase(fetchCouponsAction.rejected, (state, action) => {
      state.loading = false;
      state.coupons = null;
      state.error = action.payload;
    });

    // handle single
    //fetch single coupon
    builder.addCase(fetchCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
    });
    builder.addCase(fetchCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.error = action.payload;
    });
    // //Reset err
    builder.addCase(resetErrorAction.rejected, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
    //Rest Success
    builder.addCase(resetSuccessAction.rejected, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

//generate the reducer
const couponsReducer = couponsSlice.reducer;

export default couponsReducer;
