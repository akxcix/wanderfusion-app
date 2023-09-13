import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "/app/globals.css";
import { Provider } from "react-redux";
import { inject } from "@vercel/analytics";
import { store } from "./store/store.ts";

inject();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
