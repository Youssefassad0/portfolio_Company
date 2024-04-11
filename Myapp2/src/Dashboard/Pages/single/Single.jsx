/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect , useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Single.scss';
import SideBar from '../Components/SideBar/SideBar';
import NavBar from '../Components/NavBar/NavBar';
import Chart from '../Components/chart/Chart';
import Transaction from '../Components/Transaction/Transaction';
import  axios  from 'axios';

function Single() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const { empId } = useParams();
  const [userData, setUserData] = useState(null);

const fetchData = async ()=>{
  try{
    const response=await axios.get('http://127.0.0.1:8001/api/employes/'+empId);
    // console.log(user.data.user);
    setUserData(response.data.employe)
  }
  catch(error){
    console.error('error de server: '+error);
  }
}
  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    }
    else{
      fetchData();
    }
  }, [navigate, userInfo]);

  return (
    <div className="single">
      <SideBar />
      <div className="singleContainer">
        <NavBar userInfo={userInfo} />
        <div className="user-top">
          <div className="user-left">
            <div className="editButton">Edit</div>
            <h1 className="user-title">Informations</h1>
            <div className="user-item">
              <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/jujutsu-kaisen-satoru-gojo.jpg" alt="profile" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{userData ? userData.name : 'Loading...'}</h1>
                <div className="detailItem">
                  <div className="itemKey">Email :</div>
                  <div className="itemValue">{userData ? userData.email : 'Loading...'}</div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Phone :</div>
                  <div className="itemValue">{userData ? userData.telephone : 'Loading...'}</div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Adress :</div>
                  <div className="itemValue">{userData ? userData.addresse : 'Loading...'}</div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Country :</div>
                  <div className="itemValue">{userData ? userData.country : 'Loading...'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-right">
            <Chart aspect={3 / 1} title="Last 6 Months (Revenue)" />
          </div>
        </div>
        <div className="user-bottom">
          <Transaction />
        </div>
      </div>
    </div>
  );
}

export default Single;
