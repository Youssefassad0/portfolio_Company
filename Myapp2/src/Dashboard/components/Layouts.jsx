import Header from '../../Dashboard/Navbar/Header'
import SideBar from '../../Dashboard/Navbar/SideBar'
import Home from '../../Dashboard/Home'
function Layouts() {
  return (
    <div className="body">
    <div className="grid-container">
        <Header/>
        <SideBar/>
        <Home/>
    </div>
    </div>
  )
}

export default Layouts