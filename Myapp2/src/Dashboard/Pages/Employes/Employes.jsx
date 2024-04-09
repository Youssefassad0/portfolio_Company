import SideBar from "../Components/SideBar/SideBar";
import NavBar from "../Components/NavBar/NavBar";
import TableEmployee from "./TableEmployee";
import './Employe.css'
function Employes() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

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