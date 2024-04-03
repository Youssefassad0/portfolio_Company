/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './register.css'
import axios from "axios";
function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    let item = { name, email, password };
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            navigate("/");
        }
    }, [])
    async function Register(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8001/api/register', item);
            localStorage.setItem("user-info", JSON.stringify(response));
            navigate('/');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    // Validation errors
                    setErrors(error.response.data.errors);
                }
            }

        }

    }
    return (
        <div className="body">

            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className='formLogin' >
                <h3>Register Here</h3>
                <label htmlFor="username">UserName</label>
                <input className='input'
                    name="name"
                    type="text" placeholder="You Full Name" value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <div className="text-danger">{errors.name}</div>}

                <label htmlFor="username">Email</label>
                <input className='input' name="email"
                    type="email" placeholder="Email Adress" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
                <label htmlFor="password">Password</label>
                <input className='input' name="password"
                    type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <div className="text-danger">{errors.password}</div>}
                <button className='btn' onClick={Register} >Signup</button>
                <button className='btn'>  Sign In</button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form>
        </div>
    )
}

export default Register