
import Widget from '../Components/widgets/Widget'
import NavBar from '../Components/NavBar/NavBar'
import SideBar from '../Components/SideBar/SideBar'
import './Home.scss'
import Featured from '../Components/Featured/Featured'
import Chart from '../Components/chart/Chart'
function Home() {
  return (
    <div
      className='home' >
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="products" />
          <Widget type="employes" />
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured/>
          <Chart/>
        </div>
      </div>
    </div>
  )
}

export default Home