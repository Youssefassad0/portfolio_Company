import SideBar from '../Components/SideBar/SideBar'
import NavBar from '../Components/NavBar/NavBar'
import Product from './Product';
function MainProducts() {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    return (
        <>
            <div className="list">
                <SideBar />
                <div className="listContainer">
                    <NavBar userInfo={userInfo} />
                    <div className="products-page">
                        <h2>Products</h2>
                        <div className="product-list">
<Product/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainProducts