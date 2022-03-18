import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";

export const inventarioTalle = createAsyncThunk("INVENTARIO", (talle) => talle);

const inventarioReducer = createReducer([], {
  [inventarioTalle.fulfilled]: (state, action) => action.payload,
})


export default inventarioReducer;