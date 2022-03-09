import axios from "axios";
import { createReducer, createAction } from "@reduxjs/toolkit";

export const setUser = createAction ("SET_USER");
const userReducer = createReducer([], {
  [setUser]: (state, action) => action.payload,
});

export const sendLogin = (email,pass)=> (dispatch)=>{
  // console.log("funca")
  // console.log(email)
  // console.log(pass)
  return axios.post("/api/users/login", { //consultar ruta al back team
    email: email.value,
    password: pass.value
  }).then((res) =>{ dispatch(setUser(res.data))
  return res.data})// setear el usuario redux---luego para pedir user en otros comp, usamos useSelector
}
export const effectLogin = ()=> (dispatch)=>{
  return axios.get(`api/me`).then((res) =>{ dispatch(setUser(res.data))
  return res.data})// setear el usuario redux---luego para pedir user en otros comp, usamos useSelector
}

export default userReducer;
