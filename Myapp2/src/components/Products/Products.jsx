/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";

function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the details of the current product
        const productResponse = await axios.get(`http://127.0.0.1:8001/api/product/${id}`);
        setProduct(productResponse.data.data);

        // Fetch all products
        const allProductsResponse = await axios.get('http://127.0.0.1:8001/api/products');
        const allProducts = allProductsResponse.data.data;
        setProducts(allProducts);

        // Find similar products by filtering based on category_id
        if (productResponse.data.data && productResponse.data.data.category_id) {
          const similarProducts = allProducts.filter(p => p.category_id === productResponse.data.data.category_id && p.id !== parseInt(id));
          setSimilarProducts(similarProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <div className="App">
        <Header />
      </div>
      <div className="productcontainer">
        <div className="p-title">PRODUCT DETAIL</div>
        {product && (
          <div className="detail">
            <div className="image">
              <img src={`http://localhost:8001/${product.image}`} alt={product.name} />
            </div>
            <div className="content">
              <h1 className="name">{product.name}</h1>
              <div className="price">{product.price} DH </div>
              {product.category && (
                <div className="price"> Category : <span className="spn">{product.category.name}</span></div>
              )}
              <div className="buttons">
                <button>Check Out</button>
                <button>Chat Us</button>
              </div>
              <div className="description">
                {product.description!= "undefined" ? product.description : 'Pas de description'}
              </div>
            </div>
          </div>
        )}
        <div className="p-title">Similar products</div>
        <div className="listProduct-page">
          {similarProducts.map(similarProduct => (
            <Link key={similarProduct.id} to={`/product/${similarProduct.id}`} className="item">
              <img src={`http://localhost:8001/${similarProduct.image}`} alt={similarProduct.name} />
              <h2>{similarProduct.name}</h2>
              <div className="price">{similarProduct.price} DH</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
