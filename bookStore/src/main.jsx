import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/auth.jsx";
import Navbar from "./pages/Navbar.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </AuthProvider>
);
