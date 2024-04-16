import SideBar from "../Components/SideBar/SideBar";
import NavBar from "../Components/NavBar/NavBar";
import TableEmployee from "./TableEmployee";
import './Employe.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Employes() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();

  useEffect(() => {
      if (!userInfo || userInfo.user.role !== 'admin') {
          navigate('/');
      }
  }, [navigate, userInfo]);
  return (
    <div className="list">
    <SideBar />
    <div className="listContainer">
      <NavBar userInfo={userInfo} />
      <TableEmployee/>
    </div>
  </div>
  )
}

export default Employes