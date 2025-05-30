import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import App from "./App";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename="/Formula-front">
      <App />
    </Router>
  </React.StrictMode>
);
