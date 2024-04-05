/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import Header from '../Header/Header';
function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null); // Changed initial state to null for image
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image); 

    try {
      const response = await axios.post('http://127.0.0.1:8001/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      localStorage.setItem('user-info', JSON.stringify(response.data));
      navigate('/');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
      } else {
        console.error('Request failed:', error.message);
      }
    }

  };

  return (
    <div className="bodyLogin">
       <div className="App">
        <Header />
      </div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="formLogin">
        <h3>Register Here</h3>
        <label htmlFor="name">UserName</label>
        <input
          className="input"
          id="name"
          name="name"
          type="text"
          placeholder="Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}

        <label htmlFor="email">Email</label>
        <input
          className="input"
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input
          className="input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="text-danger">{errors.password}</div>}

        <label htmlFor="image">Image De profil</label>
        <input
          className="input"
          id="image"
          name="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* {errors.image && <div className="text-danger">{errors.image}</div>} */}
        
        <button className="btn" onClick={handleSubmit}>Signup</button>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
