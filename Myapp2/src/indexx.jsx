/* eslint-disable no-unused-vars */
import React from "react";
import "./Style/Dark.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Contact from "./components/ContactForm/contactUs";
import Service from "./components/Services/Service";
import Home from "./Dashboard/Pages/Home/Home";
import List from "./Dashboard/Pages/list/List";
import Single from "./Dashboard/Pages/single/Single";
import New from "./Dashboard/Pages/new/New";
import { userInputs, productInputs } from "./Dashboard/FormSource";
import { useContext } from "react";
import { DarkModeContext } from "./Dashboard/Context/darkModeContext";
function Appi() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={darkMode ? "dash dark" : "dash"}>
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Services" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" >
          <Route index element={<Home />} />
          <Route path="users" >
            <Route index element={<List  />} />
            <Route path=":userId" element={<Single  />} />
            <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
          </Route>
          <Route path="products" >
            <Route index element={<List />} />
            <Route path=":productId" element={<Single  />} />
            <Route path="new" element={<New  inputs={productInputs} title="Add New Product"/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
        </div>
    );
}

export default Appi;
