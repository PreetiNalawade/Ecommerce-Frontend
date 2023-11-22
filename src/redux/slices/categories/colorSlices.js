import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//intialState
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create createBrand action

export const createColorAction = createAsyncThunk(
  "color/create",
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      // const { name } = payload;
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
      const { data } = await axios.post(`${baseURL}/color`, { name }, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//getALL colors action
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/color`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const colorsSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
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
const colorsReducer = colorsSlice.reducer;

export default colorsReducer;
