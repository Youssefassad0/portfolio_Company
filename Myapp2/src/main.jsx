/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import './Style/Dark.scss'
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './components/Products/Products'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Contact from "./components/ContactForm/contactUs";
import Service from './components/Services/Service'
import Home from "./Dashboard/Pages/Home/Home";
import List from "./Dashboard/Pages/list/List";
import Single from './Dashboard/Pages/single/Single'
import New from "./Dashboard/Pages/new/New";
import { userInputs, productInputs } from "./Dashboard/FormSource";
import { useContext } from "react";
import {DarkModeContext} from './Dashboard/Context/darkModeContext'
import Appi from "./indexx";
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <Appi/>
  </React.StrictMode>
);
