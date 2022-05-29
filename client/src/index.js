import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {baseUrlServer} from "./helpers/AuthenticationService";
import axios from "axios";

axios.defaults.baseURL = baseUrlServer;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);
