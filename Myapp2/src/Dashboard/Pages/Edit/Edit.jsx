/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Edit.scss';
import SideBar from '../Components/SideBar/SideBar';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate, useParams } from 'react-router-dom';

function Update({ inputs, title, type }) {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [placedata, setPlacedata] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8001/api/${type}/${id}`)
        .then(response => {
          setPlacedata(response.data.data); // Assuming your response has a 'data' property containing user/employee details
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id, type]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      let url = '';
      if (type === 'users') {
        url = `http://127.0.0.1:8001/api/updateUser/${id}`;
      } else if (type === 'employes') {
        url = `http://127.0.0.1:8001/api/updateEmployee/${id}`;
      } else if (type === 'produit') {
        url = `http://127.0.0.1:8001/api/updateProduit/${id}`;
      }
      const formDataWithFile = new FormData();
      formDataWithFile.append('image', file);
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }
      const response = await axios.put(url, formDataWithFile);
      console.log(response.data);
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error while sending data:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon-image" />
                </label>
                <input
                  type="file"
                  id="file"
                  name='image'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={placedata[input.name]|| ''}
                    name={input.name}
                    value={formData[input.name] || ''}
                    onChange={(e) => handleChange(e, input.name)}
                  />
                  {errors[input.name] && <div className="text-danger">{errors[input.name]}</div>}
                </div>
              ))}

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
