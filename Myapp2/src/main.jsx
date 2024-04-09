/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import './Style/Dark.scss'
import Appi from "./indexx";
import { DarkModeContextProvider } from "./Dashboard/Context/darkModeContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <DarkModeContextProvider>
    <Appi/>
    </DarkModeContextProvider>
  </React.StrictMode>
);
