import SideBar from "../Components/SideBar/SideBar";
import NavBar from "../Components/NavBar/NavBar";
function Employes() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

  return (
    <div className="list">
    <SideBar />
    <div className="listContainer">
      <NavBar userInfo={userInfo} />
    </div>
  </div>
  )
}

export default Employes