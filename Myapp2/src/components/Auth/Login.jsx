/* eslint-disable react-hooks/exhaustive-deps */
import { useState ,useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  }, []);
  async function onLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8001/api/login', { email, password });
      localStorage.setItem('user-info', JSON.stringify(response));
      navigate('/');
    } catch (error) {
      // Handle errors from server response
      if (error.response) {
        if (error.response.status === 422) {
          // Validation errors
          setError(error.response.data.errors);
        } else if (error.response.status === 401) {
          // Invalid credentials
          setError({ general: "Invalid email or password" });
        } else {
          // Other server errors
          console.error("Server error:", error.response.data.message);
        }
      } else {
        console.error("Request failed:", error.message);
      }
    }
  }
  return (
    <>
      <div className="body">

        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className='formLogin' >
          <h3>Login Here</h3>

          <label htmlFor="username">Email</label>
          <input className='input' type="text" placeholder="Email or Phone" value={email} onChange={e => setEmail(e.target.value)} />
          {error.email && <div className="text-danger">{error.email}</div>}
          <label htmlFor="password">Password</label>
          <input className='input' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error.password && <div className="text-danger">{error.password}</div>}
          <button className='btn' onClick={onLogin} >Log In</button>
          <Link to="/register" ><button className='btn'>  Sign Up</button></Link>
          <div className="social">
            <div className="go"><i className="fab fa-google"></i>  Google</div>
            <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
