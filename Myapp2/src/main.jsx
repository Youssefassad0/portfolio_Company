import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Products from './components/Products/Products'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Contact from "./components/ContactForm/contactUs";
import Service from './components/Services/Service'
import Layouts from "./Dashboard/components/Layouts";
// import Hero from "./components/Hero/Hero";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Services" element={<Service />} />
        {/* <Route path="/contact" element={<App />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Layouts />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
