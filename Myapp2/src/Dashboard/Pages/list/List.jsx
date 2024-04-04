import "./List.scss"

import SideBar from "../Components/SideBar/SideBar"
import NavBar from "../Components/NavBar/NavBar";
import Datatable from "../Components/DataTable/Datatable";

const List = () => {
  return (
    <div className="list">
      <SideBar/>
      <div className="listContainer">
        <NavBar/>
       <Datatable/>
      </div>
     
    </div>
  )
}

export default List