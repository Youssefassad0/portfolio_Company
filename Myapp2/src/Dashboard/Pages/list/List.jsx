/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react"; // Ajout de React
import "./List.scss";
import SideBar from "../Components/SideBar/SideBar";
import NavBar from "../Components/NavBar/NavBar";
import Datatable from "../Components/DataTable/Datatable";
import { useNavigate } from 'react-router-dom';

const List = ({url,titleList}) => {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || (userInfo.user && userInfo.user.role !== 'admin')) {
      navigate('/');
      window.location.reload();
    } 
  }, [userInfo, navigate]); 
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar userInfo={userInfo} />
        <Datatable url={url} titleList={titleList} />
      </div>
    </div>
  );
};

export default List;
