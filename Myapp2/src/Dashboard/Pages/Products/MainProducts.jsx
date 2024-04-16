import SideBar from '../Components/SideBar/SideBar'
import NavBar from '../Components/NavBar/NavBar'
import Product from './Product';
import { Link } from 'react-router-dom';
function MainProducts() {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    return (
        <>
            <div className="new">
                <SideBar />
                <div className="newContainer">
                    <NavBar userInfo={userInfo} />
                    <div className="top">
                    <div className="datatableTitle">
                Add New Employe
                <Link to="/dashboard/products/new" className="link">
                    Add New
                </Link>
            </div>
                    </div>
                    <div className="products-page">

                        <div className="product-list">
                            <Product />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainProducts