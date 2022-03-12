import axios from "axios";
import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";

export const effectProducts = createAsyncThunk("PRODUCTOS", () => {
  return axios.get("/api/admin/productos").then((res) => res.data);
});

const productsReducer = createReducer([], {
  [effectProducts.fulfilled]: (state, action) => action.payload,
})


export default productsReducer;