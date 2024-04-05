/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './New.scss'
import SideBar from '../Components/SideBar/SideBar'
import NavBar from '../Components/NavBar/NavBar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function New() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    }
  }, [])
  return (
    <div className='new' >
      <SideBar />
      <div className="newContainer">
        <NavBar userInfo={userInfo} />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK2Om8Z9yJ7bQR3s88GZmzu_Lw_u8KYLg6IQ&s" alt="" />
          </div>
          <div className="right">
            <form action="">
              <div className="formInput">
                <label htmlFor="">UserName</label>
                <input type="text" placeholder='assad youssef  ' />
              </div>
              <div className="formInput">
                <label htmlFor="">Email</label>
                <input type="email" placeholder='assad@exemple.com' />
                <div className="formInput">
                  <label htmlFor="">Password</label>
                  <input type="password" />
                </div>
              </div> <div className="formInput">
                <label htmlFor="">Phone number</label>
                <input type="text" placeholder='+212 099 333 ' />
              </div>
              <div className="formInput">
                <label htmlFor="">Adress</label>
                <input type="text" placeholder='soulem jawhara 20 , sahel'/>
              </div> <div className="formInput">
                <label htmlFor="">Country</label>
                <input type="text" placeholder='Morocco  ' />
              </div>
            </form></div>
        </div>
      </div>
    </div>
  )
}

export default New