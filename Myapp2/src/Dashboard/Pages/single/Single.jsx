/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './Single.scss'
import SideBar from '../Components/SideBar/SideBar'
import NavBar from '../Components/NavBar/NavBar'
import Chart from '../Components/chart/Chart'
import Transaction from '../Components/Transaction/Transaction'
import { useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom';
function Single() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

const {id}=useParams();
console.log(id);
  useEffect(() => {
    // console.log(userInfo);
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');

    }
  }, []);
  return (
    <div className="single">
      <SideBar />
      <div className="singleContainer">
        <NavBar userInfo={userInfo} />
        <div className="user-top">
          <div className="user-left">
            <div className="editButton">
              Edit
            </div>
            <h1 className="user-title">
              Informations
            </h1>
            <div className="user-item">
              <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/jujutsu-kaisen-satoru-gojo.jpg" alt="profile" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  Assad Aziz
                </h1>
                <div className="detailItem">
                  <div className="itemKey">Email : </div>
                  <div className="itemValue">assad@gmail.com </div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Phone : </div>
                  <div className="itemValue">+2120678383</div>
                </div>

                <div className="detailItem">
                  <div className="itemKey">Adress : </div>
                  <div className="itemValue">zar9toni , boulvrad j33</div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Country  : </div>
                  <div className="itemValue">morroco </div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-right">
            <Chart aspect={3 / 1} title={"Last 6 Months (Revenue)"} />
          </div>
        </div>
        <div className="user-bottom">
          <Transaction />
        </div>
      </div>
    </div>
  )
}

export default Single