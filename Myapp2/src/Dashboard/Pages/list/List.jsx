/* eslint-disable react/prop-types */
import "./List.scss";
import { useEffect } from "react";
import SideBar from "../Components/SideBar/SideBar";
import NavBar from "../Components/NavBar/NavBar";
import Datatable from "../Components/DataTable/Datatable";
import { useNavigate } from 'react-router-dom';

const List = () => {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || (userInfo.user && userInfo.user.role !== 'admin')) {
      navigate('/');
    }
  }, [navigate, userInfo]); // Add userInfo as a dependency

  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar userInfo={userInfo} />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
