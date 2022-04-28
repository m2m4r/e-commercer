import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bulma/css/bulma.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./states/store";
import ProductContextProvider from "./context/product";
import SizeContextProvider from "./context/size";
import StarsReviewProvider from "./context/starsReview";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ProductContextProvider>
        <SizeContextProvider>
          <StarsReviewProvider>
            <App />
          </StarsReviewProvider>
        </SizeContextProvider>
      </ProductContextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
