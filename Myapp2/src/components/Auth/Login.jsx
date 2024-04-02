import './login.css'
const Login = () => {
  return (
    <>
    <div className="body">

    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form className='formLogin' >
      <h3>Login Here</h3>

      <label htmlFor="username">Username</label>
      <input className='input' type="text" placeholder="Email or Phone" id="username" />

      <label htmlFor="password">Password</label>
      <input  className='input' type="password" placeholder="Password" id="password" />

      <button className='btn' >Log In</button>
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
