import React, { createContext, useState } from "react";

export const SizeContext = createContext();

const SizeContextProvider = ({ children }) => {
  const [size, setSize] = useState(0);

  return (
    <SizeContext.Provider value={{ size, setSize }}>
      {children}
    </SizeContext.Provider>
  );
};

export default SizeContextProvider;
