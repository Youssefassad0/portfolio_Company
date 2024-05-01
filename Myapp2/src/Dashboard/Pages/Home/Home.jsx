import { useState, useEffect } from "react";
import axios from "axios";
import Widget from "../Components/widgets/Widget";
import NavBar from "../Components/NavBar/NavBar";
import SideBar from "../Components/SideBar/SideBar";
import "./Home.scss";
import Featured from "../Components/Featured/Featured";
import Chart from "../Components/chart/Chart";
import Transaction from "../Components/Transaction/Transaction";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8001/api/users");
        const response2 = await axios.get(
          "http://127.0.0.1:8001/api/employes"
        );
        const response3 = await axios.get(
          "http://127.0.0.1:8001/api/products"
        );
        setUsers(response.data.users);
        setEmployes(response2.data.employes);
        setProducts(response3.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8001/api/transactions"
        );
        setTransactionData(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, []);

  useEffect(() => {
    // Redirect if user is not logged in or is not an admin
    if (!userInfo || userInfo.user.role !== "admin") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar userInfo={userInfo} />
        <div className="widgets">
          <Widget type="user" length={users.length} />
          <Widget type="products" length={products.length} />
          <Widget type="employes" length={employes.length} />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            aspect={2 / 1}
            title="Last 6 Months (Revenue) $"
            dataT={transactionData}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transaction</div>
          <div className="minTitle">All Transaction for this Week</div>
          <Transaction />
        </div>
      </div>
    </div>
  );
}

export default Home;