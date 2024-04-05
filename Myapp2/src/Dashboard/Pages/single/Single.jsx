import './Single.scss'
import SideBar from '../Components/SideBar/SideBar'
import NavBar from '../Components/NavBar/NavBar'
function Single() {
  return (
    <div className="single">
      <SideBar/>
      <div className="singleContainer">
        <NavBar/>
        hiii
      </div>
    </div>
  )
}

export default Single