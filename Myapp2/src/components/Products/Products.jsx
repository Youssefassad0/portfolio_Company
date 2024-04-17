import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Header from "../Header/Header";

/* eslint-disable react/prop-types */
function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/product/' + id);
        setProduct(response.data.data);

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
      <div className="p-title">PRODUCT DETAIL</div>
      {product && (
        <div className="detail">
          <div className="image">
            <img src={`http://localhost:8001/${product.image}`} alt="" />
          </div>
          <div className="content">
            <h1 className="name">{product.name}</h1>
            <div className="price">{product.price} DH </div>
            {product.category && (
            <div className="price"> Category : <span className="spn" > {product.category.name}</span></div>
          )}            <div className="buttons">
              <button>Check Out</button>
              <button>Add To Cart 
                <span>
                  <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                  </svg>
                </span>
              </button>
            </div>
            <div className="description">{product.description}</div>
          </div>
        </div>
      )}
      <div className="p-title">Similar products</div>
      <div className="listProduct">
        {/* You can render similar products here if needed */}
      </div>
    </div>

    </>
  )
}

export default Products