/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Header from "../Header/Header"
import axios from "axios";
import './Products.scss'
import { Link } from "react-router-dom";
function HomeProducts() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/products');

                setProducts(response.data.data);
                console.log(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <div className="App">
                <Header />
            </div>
            <div className="productcontainer">
                <div className="p-title">PRODUCT LIST</div>
                <div className="listProduct-page">
                    {products && products.map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} className="item">
                            <img src={`http://localhost:8001/${product.image}`} alt="" />
                            <h2>{product.name}</h2>
                            <h3>{product.category.name}</h3>
                            <div className="price">${product.price}</div>
                        </Link>

                    ))}
                </div>
            </div>

        </>
    )
}

export default HomeProducts