import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../Components/SideBar/SideBar';
import NavBar from '../Components/NavBar/NavBar';
import Product from './Product';

function MainProducts() {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!userInfo || userInfo.user.role !== 'admin') {
            navigate('/');
        } else {
            fetchData();
        }
    }, [navigate, userInfo]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8001/api/products');
            setProducts(response.data.data);
          
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    

    return (
        <div className="new">
            <SideBar />
            <div className="newContainer">
                <NavBar userInfo={userInfo} />
                <div className="top">
                    <div className="datatableTitle">
                        Add New Employee
                        <Link to="/dashboard/products/new" className="link">
                            Add New
                        </Link>
                    </div>
                </div>
                <div className="products-page">
                    <div className="product-list">
                        {products.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainProducts;
