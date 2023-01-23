import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []

export const carritoProducto = createAsyncThunk("OBTENER_CARRITO", async (email)=>{
    try {
        const productos = await axios.get(`/api/carrito/${email}`)
        return productos.data
    } catch (error) {
        console.log(error);
    }
});

const carritoReducer = createReducer(initialState, {
  [carritoProducto.fulfilled]: (state, action) => action.payload,
});

export default carritoReducer;