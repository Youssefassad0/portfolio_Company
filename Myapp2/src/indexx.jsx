/* eslint-disable no-unused-vars */
import React from "react";
import "./Style/Dark.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Contact from "./components/ContactForm/contactUs";
import Service from "./components/Services/Service";
import Home from "./Dashboard/Pages/Home/Home";
import List from "./Dashboard/Pages/list/List";
import Single from "./Dashboard/Pages/single/Single";
import New from "./Dashboard/Pages/new/New";
import { userInputs, productInputs, employeInputs } from "./Dashboard/FormSource";
import { useContext } from "react";
import { DarkModeContext } from "./Dashboard/Context/darkModeContext";
import Employes from "./Dashboard/Pages/Employes/Employes";
import Profile from "./components/Profile/Profile";
import Edit from "./Dashboard/Pages/Edit/Edit";
import Category from "./Dashboard/Pages/Category/Category";
import AddCategory from "./Dashboard/Pages/Category/AddCategory";
import MainProducts from "./Dashboard/Pages/Products/MainProducts";
import EditProduct from "./Dashboard/Pages/Products/EditProduct/EditProduct";
import NewProduct from "./Dashboard/Pages/new/NewProduct";
import HomeProducts from "./components/Products/HomeProducts";
import Products from "./components/Products/Products";
import Messages from "./Dashboard/Pages/Components/Messages/Messages";

function Appi() {
  const { darkMode } = useContext(DarkModeContext);
  const urlUsers = "http://127.0.0.1:8001/api/users";
  return (
    <div className={darkMode ? "dash dark" : "dash"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<HomeProducts />} />
          <Route path="/Services" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" >
            <Route index element={<Home />} />
            <Route path="users" >
              <Route index element={<List url={urlUsers} titleList="Add New User" />} />
              <Route path=":id" element={<Single entityType="user" />} />
              <Route path="edit/:id" element={<Edit entityType="user" inputs={userInputs} type="users" title="Edit User" />} />
              <Route path="new" element={<New inputs={userInputs} type="users" title="Add New User" />} />
            </Route>
            <Route path="employes" >
              <Route index element={<Employes />} />
              <Route path=":id" element={<Single entityType="employee" />} />
              <Route path="edit/:id" element={<Edit entityType="employee" inputs={employeInputs} type="employes" title="Edit Employee" />} />
              <Route path="new" element={<New inputs={employeInputs} type="employes" title="Add New Employe" />} />
            </Route>
            <Route path="products" >
              <Route index element={<MainProducts />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="new" element={<NewProduct inputs={productInputs} type="produit" title="Add New Product" />} />
            </Route>
            <Route path="categories" >
              <Route index element={<Category />} />
              <Route path=":id" element={<AddCategory />} />
              <Route path="new" element={<AddCategory />} />
            </Route>
            <Route path="messages" >
            <Route index element={<Messages />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Appi;
