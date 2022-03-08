import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", () => {
  return axios.post("/api/login").then((r) => r.data);
});
const userReducer = createReducer([], {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
