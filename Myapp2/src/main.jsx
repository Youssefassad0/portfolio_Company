import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./App";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
// import Hero from "./components/Hero/Hero";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        <div>
          <Header />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<App />} />
        <Route path="/Services" element={<App />} />
        <Route path="/contact" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
