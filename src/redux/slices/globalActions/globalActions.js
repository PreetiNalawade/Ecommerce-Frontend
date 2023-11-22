import { createAsyncThunk } from "@reduxjs/toolkit";

//Reset the error action
export const resetErrorAction = createAsyncThunk("resetError-action", () => {
  return {};
});

//Reset success Action
export const resetSuccessAction = createAsyncThunk(
  "resetSuccess-action",
  () => {
    return {};
  }
);
