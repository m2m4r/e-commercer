import axios from "axios";
import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";

export const cart = createAsyncThunk("CARRITO",()=>{
    return axios.get(`/api/users/carrito`).then(res=>res.data)
})

export const addCartItem = createAsyncThunk("AGREGAR_A_CARRITO",(product_Id , cantidad, talle)=>{ 
  return axios.post(`/api/users/${product_Id}/addToCart`,{
    cantidad: cantidad,
    talle: talle
  }).then(res=>res.data)
})

export const updateCartItem = createAsyncThunk("ACTUALIZAR_CARRITO",(array)=>{ 
  return axios.put(`/api/users/carrito/${array[0]}`,{
    cantidad: array[1],
    talle: array[2]
  }).then(res=>res.data)
})

export const deleteCartItem = createAsyncThunk("ELIMINAR_DE_CARRITO",(product_Id)=>{ 
  console.log(product_Id)
  axios.delete(`/api/users/carrito/${product_Id}`).then(res=>console.log(res.data))
  .then(res=>res.data)
})

const cartReducer = createReducer([], {
    [cart.fulfilled]: (state, action) => action.payload,
    [addCartItem.fulfilled]: (state, action) => action.payload,
    [updateCartItem.fulfilled]: (state, action) => action.payload,
    [deleteCartItem.fulfilled]: (state, action) => action.payload,
})


export default cartReducer;