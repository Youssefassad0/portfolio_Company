/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import './New.scss';
import SideBar from '../Components/SideBar/SideBar';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from 'react-router-dom';

function New({ inputs, title, type }) {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithFile = new FormData();
    formDataWithFile.append('image', file);

    Object.entries(formData).forEach(([key, value]) => {
      formDataWithFile.append(key, value);
    });

    try {
      let url = '';
      if (type === 'user') {
        url = 'http://127.0.0.1:8001/api/addUser';
      } else if (type === 'employe') {
        url = 'http://127.0.0.1:8001/api/addEmploye';
      } else if (type === 'produit') {
        url = 'http://127.0.0.1:8001/api/addProduit';
      }

      const response = await axios.post(url, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setErrors({});
      // Do something with the response, e.g., redirect the user.
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error while sending data:', error);
      }
    }
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
                    placeholder={input.placeholder}
                    name={input.name}
                    value={formData[input.name] || ''}
                    onChange={(e) => handleChange(e, input.name)}
                  />
                  {errors[input.name] && <div className="text-danger">{errors[input.name]}</div>}
                </div>
              ))}

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
