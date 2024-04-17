/* eslint-disable react-hooks/exhaustive-deps */
import Widget from '../Components/widgets/Widget'
import NavBar from '../Components/NavBar/NavBar'
import SideBar from '../Components/SideBar/SideBar'
import './Home.scss'
import Featured from '../Components/Featured/Featured'
import Chart from '../Components/chart/Chart'
import Transaction from '../Components/Transaction/Transaction'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Home() {
  const navigate = useNavigate();
  const [users,setUsers]=useState([]);
  const [products,setProducts]=useState([]);
  const [employes,setEmployes]=useState([]);
  const fetchData = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8001/api/users");
        const response2 = await axios.get("http://127.0.0.1:8001/api/employes");
        const response3= await axios.get("http://127.0.0.1:8001/api/products");
        setUsers(response.data.users);
        setEmployes(response2.data.employes);
        setProducts(response3.data.data)
        // console.log(response2);
        // setTimeout(() => setLoading(false), 1000);
    } catch (error) {
        console.error("Error fetching users:", error);
        // setLoading(false);
    }
};
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  
  useEffect(() => {
    fetchData();
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
          <Widget type="user"  length={users.length} />
          <Widget type="products" length={products.length} />
          <Widget type="employes" length={employes.length}/>
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
