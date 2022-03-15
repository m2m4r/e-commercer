import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [producto, setProducto] = useState({});

  return (
    <ProductContext.Provider value={{ producto, setProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
