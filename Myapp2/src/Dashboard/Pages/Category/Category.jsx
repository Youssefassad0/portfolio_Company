import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import SideBar from '../Components/SideBar/SideBar';
import CategoryTable from './CategoryTable';

function ListCategory() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || (userInfo.user && userInfo.user.role !== 'admin')) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar userInfo={userInfo} />
        <CategoryTable />
      </div>
    </div>
  );
}

export default ListCategory;
