import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Styles
import "./index.scss";

// Router
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Axios
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
