import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-teal/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
);
