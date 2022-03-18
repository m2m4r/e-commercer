import React, { createContext, useState } from "react";

export const StarsReviewContext = createContext();

const StarsReviewContextProvider = ({ children }) => {
  const [stars, setStars] = useState(0);

  return (
    <StarsReviewContext.Provider value={{ stars, setStars }}>
      {children}
    </StarsReviewContext.Provider>
  );
};

export default StarsReviewContextProvider;
