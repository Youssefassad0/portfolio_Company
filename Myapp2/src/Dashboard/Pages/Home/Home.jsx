
import NavBar from '../Components/NavBar/NavBar'
import SideBar from '../Components/SideBar/SideBar'
import './Home.scss'
function Home() {
  return (
    <div
      className='home' >
      <SideBar />
      <div className="homeContainer">
        <NavBar/>
        Home Conatainer
      </div>
    </div>
  )
}

export default Home