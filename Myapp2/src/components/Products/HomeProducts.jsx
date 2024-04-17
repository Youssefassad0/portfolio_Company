import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import './Products.scss'
import { Link } from "react-router-dom";

function HomeProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/productsR');
                const cate = await axios.get('http://127.0.0.1:8001/api/listCategory');
                setCategories(cate.data.data);
                setProducts(response.data.data);
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchData();
    }, [])

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const filteredProducts = selectedCategory ?
        products.filter(product => product.category.name === selectedCategory) :
        products;

    return (
        <>
            <div className="App">
                <Header />
            </div>
            {
                loading ? <div className="ring">Loading
                    <span id="span" ></span>
                </div> : (
                    <div className="productcontainer">
                        <div className="p-title">PRODUCT LIST</div>
                        <div className="category-filter">
                            <label htmlFor="category">Filter by Category:</label>
                            <select id="category"  onChange={handleCategoryChange}>
                                <option value="">All Categories</option>
                                {/* Assuming categories is an array of all unique categories */}
                                {categories.map(category => (
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="listProduct-page">
                            {filteredProducts.map(product => (
                                <Link key={product.id} to={`/product/${product.id}`} className="item">
                                    <img src={`http://localhost:8001/${product.image}`} alt="" />
                                    <h2>{product.name}</h2>
                                    <h3>{product.category.name}</h3>
                                    <div className="price">{product.price} DH </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default HomeProducts;
