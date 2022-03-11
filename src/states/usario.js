import axios from "axios";
import { createReducer, createAction } from "@reduxjs/toolkit";

export const setUser = createAction ("SET_USER");
const userReducer = createReducer([], {
  [setUser]: (state, action) => action.payload,
});

export const sendLogin = (email,pass)=> (dispatch)=>{
  console.log("funca")
  console.log(email)
  console.log(pass)
  return axios
  .post("/api/users/login", {
    email: email.value,
    contraseña: pass.value
  }).then((res) =>{ 
    console.log(res.data)
    dispatch(setUser(res.data))
  return res.data})// setear el usuario redux---luego para pedir user en otros comp, usamos useSelector
}

export default userReducer;
