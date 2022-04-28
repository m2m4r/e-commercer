import axios from "axios";
import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";

export const prodListAdmin = createAsyncThunk("PRODUCTOS", () => {
  return axios.get("/api/admin/productos").then((res) => res.data);
});

export const addProduct = createAsyncThunk("INVENTARIO_TALLE", (option) => {
  return axios.post(`api/admin/productos/nuevo` , {
      modelo: option.modelo,
      price: option.precio,
      marca: option.marca,
      descripcion: option.descripcion,
      categorias:[],
      image_url: option.img
  }).then((res) => {
    console.log("respuesta de server",res.data)
    return axios.get("/api/admin/productos").then((r) => r.data);
  });
});

export const addStock = createAsyncThunk("INVENTARIO_TALLE", (option) => {
  return axios.post(`/api/admin/productos/${option.id}/stock` , {
    talle:option.talle,
    stock:option.stock
  }).then((res) => {
    console.log("respuesta de server",res.data)
    return axios.get("/api/admin/productos").then((r) => r.data);
  });
});
const adminReducer = createReducer([], {
  [prodListAdmin.fulfilled]: (state, action) => action.payload,
  [addStock.fulfilled]: (state, action) => action.payload,
  [addProduct.fulfilled]: (state, action) => action.payload,
})


export default adminReducer;


