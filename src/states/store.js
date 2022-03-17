import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./usario";
import productsReducer from "./productos";
import cartReducer from "./cart";
import sendReducer from "./send";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    productos: productsReducer,
    cart: cartReducer,
    send: sendReducer
  },
});

export default store;
