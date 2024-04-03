/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

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
      const response = await axios.post('http://127.0.0.1:8001/api/login', { email, password });
      localStorage.setItem('user-info', JSON.stringify(response.data)); // Save only response data
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
    <div className="body">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="formLogin">
        <h3>Login Here</h3>
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="text"
          id="email"
          name="email" // Add name attribute
          autoComplete="email" // Set autocomplete attribute to "email"
          placeholder="Email or Phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.general && <div className="text-danger">{error.general}</div>}

        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          name="password" // Add name attribute
          autoComplete="current-password" // Set autocomplete attribute to "current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.general && <div className="text-danger">{error.general}</div>}
        <button className="btn" onClick={handleLogin}>
          Log In
        </button>
        <Link to="/register">
          <button className="btn">Sign Up</button>
        </Link>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
