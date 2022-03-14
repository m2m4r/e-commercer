import axios from "axios";
import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";

export const sendLogin = createAsyncThunk("LOGIN", (dataUser) => {
  return axios.post("/api/users/login" , {
  email: dataUser[0].value,
  contraseña: dataUser[1].value
  }).then((res) => res.data);
});
export const effectLogin = createAsyncThunk("PERSISTENCIA", () => {
  return axios.get("/api/users/me").then((res) => res.data);
});

const userReducer = createReducer([], {
  [sendLogin.fulfilled]: (state, action) => action.payload,
  [effectLogin.fulfilled]: (state, action) => action.payload,
})


export default userReducer;
