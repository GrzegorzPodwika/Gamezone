import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { baseUrlServer } from "./helpers/ConstValues";

axios.defaults.baseURL = baseUrlServer;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
