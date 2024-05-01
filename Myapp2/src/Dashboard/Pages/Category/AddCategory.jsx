import  { useEffect, useState } from 'react';
import './addCategory.scss';
import SideBar from '../Components/SideBar/SideBar';
import NavBar from '../Components/NavBar/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AddCategory() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
    if (id) {
      fetchCategory(id);
    }
  }, []);

  const fetchCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8001/api/listCategory/${categoryId}`);
      const { name, description } = response.data.data;
      setName(name);
      setDescription(description);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const addOrUpdateCategory = async (e) => {
    e.preventDefault();
    const categoryData = { name, description };
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8001/api/editCategory/${id}`, categoryData);
      } else {
        await axios.post('http://127.0.0.1:8001/api/addCategory', categoryData);
      }
      setMessage(id ? 'Category updated successfully' : 'Category added successfully');
      setTimeout(() => {
        setMessage('');
      }, 1400);
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data.errors;
        setNameError(errors.name ? errors.name[0] : '');
        setDescriptionError(errors.description ? errors.description[0] : '');
      }
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar userInfo={userInfo} />
        <div className="top">
          <h2>{id ? 'Modifier une catégorie' : 'Ajouter une catégorie'}</h2>
        </div>
        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}
        <div className="bottom">
          <div className="right">
            <div className="category-form">
              <form id="formCate" onSubmit={addOrUpdateCategory}>
                <div className="form-group">
                  <label htmlFor="name">Nom de la catégorie</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {nameError && <small className="text-danger">{nameError}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description de la catégorie</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {descriptionError && <small className="text-danger">{descriptionError}</small>}
                </div>
                <button type="submit" id="btnCate">
                  {id ? 'Modifier la catégorie' : 'Ajouter la catégorie'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
