import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
//intialState
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create createBrand action

export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      //fromData
      const formData = new FormData();
      formData.append("name", name);

      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Images
      const { data } = await axios.post(
        `${baseURL}/brand`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//get brand action
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brand`);
      //console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
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
const brandsReducer = brandsSlice.reducer;

export default brandsReducer;
