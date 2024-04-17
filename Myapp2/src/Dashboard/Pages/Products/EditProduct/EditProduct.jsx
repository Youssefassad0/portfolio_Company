/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import SideBar from '../../Components/SideBar/SideBar';
import './EditProduct.scss';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user-info'));
    } catch (error) {
      return null;
    }
  });

  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userInfo || userInfo.user.role !== 'admin') {
          navigate('/');
        } else {
          const [productResponse, categoryResponse] = await Promise.all([
            axios.get(`http://127.0.0.1:8001/api/product/${id}`),
            axios.get('http://127.0.0.1:8001/api/listCategory')
          ]);
          setProduct(productResponse.data.data);
          setCategory(categoryResponse.data.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

  }, [id, navigate, userInfo]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category_id', product.category_id);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('image', e.target.elements.image.files[0]);
  
      await axios.post(`http://127.0.0.1:8001/api/updateProduct/${id}`, formData);
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <div className="new">
        <SideBar />
        <div className="newContainer">
          <NavBar userInfo={userInfo} />
          <div className="top">
            <h1>Edit Products</h1>
          </div>
          <form className="cateForm" onSubmit={handleSubmit}>
            {error && <p>Error: {error}</p>}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={product.name} onChange={handleInput} />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={product.description} onChange={handleInput}></textarea>

            <label htmlFor="category">Category:</label>
            <select id="category" name="category_id" value={product.category_id} onChange={handleInput}>
              {category.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" step="0.01" value={product.price} onChange={handleInput} />

            <label htmlFor="stock">Stock:</label>
            <input type="number" id="stock" name="stock" value={product.stock} onChange={handleInput} />

            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
