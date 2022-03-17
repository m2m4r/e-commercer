import axios from "axios";
import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";

export const sendAdress = createAsyncThunk("SEND_ADRESS", (adress) => adress);

const sendReducer = createReducer([], {
  [sendAdress.fulfilled]: (state, action) => action.payload,
})


export default sendReducer;