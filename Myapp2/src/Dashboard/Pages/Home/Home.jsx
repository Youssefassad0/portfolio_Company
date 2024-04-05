/* eslint-disable react-hooks/exhaustive-deps */
import Widget from '../Components/widgets/Widget'
import NavBar from '../Components/NavBar/NavBar'
import SideBar from '../Components/SideBar/SideBar'
import './Home.scss'
import Featured from '../Components/Featured/Featured'
import Chart from '../Components/chart/Chart'
import Transaction from '../Components/Transaction/Transaction'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  
  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    }
  }, []);

  return (
    <div className='home'>
      <SideBar />
      <div className="homeContainer">
        <NavBar userInfo={userInfo} />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="products" />
          <Widget type="employes" />
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart aspect={2 / 1}  title={"Last 6 Months (REvenue)"} />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Latest Transaction
          </div>
          <Transaction />
        </div>
      </div>
    </div>
  )
}

export default Home
