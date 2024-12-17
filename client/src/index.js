import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createstore } from "redux";
import { thunk } from "redux-thunk";
import Reducers from "./Reducers";
import { GoogleOAuthProvider } from "@react-oauth/google";

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = function (...args) {
    if (/Warning:/.test(args[0])) {
      return; // Ignore React warnings
    }
    originalWarn.apply(console, args);
  };
} else if (process.env.NODE_ENV === "production") {
  console.warn = () => {}; // Suppress all warnings in production
}

const store = createstore(Reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="202033990842-0je6ltr224aggfnqb8a5fqjp9khdtds9.apps.googleusercontent.com">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);

reportWebVitals();
