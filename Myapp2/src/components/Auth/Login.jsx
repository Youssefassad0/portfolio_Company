/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Header from "../Header/Header";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8001/api/login', { email, password }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      localStorage.setItem('user-info', JSON.stringify(response.data));
      // console.log(response.data);
      navigate('/');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setError('');
          setError({ general: 'Please enter valid email and password' });
        } else if (error.response.status === 404) {
          setError('');

          setError({ general: 'User not found' });
        } else if (error.response.status === 401) {
          setError('');

          setError({ general: 'Invalid email or password' });
        } else {
          setError('');

          setError({ general: 'Something went wrong. Please try again later' });
        }
      } else {
        setError('');

        setError({ general: 'Network error. Please try again later' });
      }
    }
  };

  return (
    <>
      <div className="App">
        <Header />
      </div>
      <div className="bodyLogin">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="formLogin">
          <h3>Login Here</h3>
          {error.general && <div className="text-danger text-center">{error.general}</div>}
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='btns' >

          <button className="btn" onClick={handleLogin}>
            Log In
          </button>
          <Link to="/register"  >
            <a className="btn">Sign Up</a>
          </Link>
          </div>

        </form>
      </div>
    </>
  );
};

export default Login;
