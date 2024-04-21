/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Single.scss';
import SideBar from '../Components/SideBar/SideBar';
import NavBar from '../Components/NavBar/NavBar';
import Chart from '../Components/chart/Chart';
// import Transaction from '../Components/Transaction/Transaction';
import axios from 'axios';
import TransactionUser from '../Components/Transaction/TransactionUser';

function Single({ entityType }) {
  console.log();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const { id } = useParams();
  const [entityData, setEntityData] = useState(null);
  const urlImg = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
  const fetchData = async () => {
    try {
      let url = '';

      if (entityType === 'user') {
        url = `http://127.0.0.1:8001/api/users/${id}`;
      } else if (entityType === 'employee') {
        url = `http://127.0.0.1:8001/api/employes/${id}`;
      } else if (entityType === 'product') {
        url = `http://127.0.0.1:8001/api/products/${id}`;
      }

      const response = await axios.get(url);
      setEntityData(response.data.data);
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    } else {
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
            <div className="editButton">
              <Link to={`/dashboard/users/edit/${id}`}>Edit</Link>
            </div>
            <h1 className="user-title">Informations</h1>
            <div className="user-item">
              <img src={entityData ? `http://127.0.0.1:8001/${entityData.image}` : urlImg} alt="profile" className="itemImg" />
              <div className="details">
              <h1 className="itemTitle">{entityData && entityType==="user" ? entityData.name : null}</h1> <h1 className="itemTitle">{entityData && entityType==="employee" ? entityData.nom + " "+ entityData.prenom : null}</h1>
                <div className="detailItem">
                  <div className="itemKey">Email :</div>
                  <div className="itemValue">{entityData ? entityData.email : 'Loading...'}</div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Phone :</div>
                  <div className="itemValue">{entityData ? entityData.telephone : 'Loading...'}</div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Address :</div>
                  <div className="itemValue">{entityData ? entityData.addresse : 'Loading...'}</div>
                </div>
                {
                  entityData && entityType == 'user' ?
                    <div className="detailItem">
                      <div className="itemKey">Country :</div>
                      <div className="itemValue">{entityData ? entityData.country : 'Loading...'}</div>
                    </div> : null
                }
                {
                  entityData && entityType == 'employee' ?
                    <>
                      <div className="detailItem">
                        <div className="itemKey">date naissance :</div>
                        <div className="itemValue">{entityData ? entityData.date_naissance : 'Loading...'}</div>
                      </div>
                      <div className="detailItem">
                        <div className="itemKey">date d  embauche :</div>
                        <div className="itemValue">{entityData ? entityData.date_embauche : 'Loading...'}</div>
                      </div> <div className="detailItem">
                        <div className="itemKey">Salaire :</div>
                        <div className="itemValue">{entityData ? entityData.salaire + 'DH' : 'Loading...'}</div>
                      </div> <div className="detailItem">
                        <div className="itemKey">date naissance :</div>
                        <div className="itemValue">{entityData ? entityData.date_naissance : 'Loading...'}</div>
                      </div>
                    </>
                    : null
                }
              </div>
            </div>
          </div>
          <div className="user-right">
            <Chart aspect={3 / 1} title="Last 6 Months payment)" />
          </div>
        </div>
        <div className="user-bottom">
        <TransactionUser userName={entityData && entityType === 'user' ? entityData.name : null} />
        </div>
      </div>
    </div>
  );
}

export default Single;
