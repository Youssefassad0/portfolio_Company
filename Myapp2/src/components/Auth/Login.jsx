import styles from '../Auth/style.css'; // Import CSS module

function Login() {
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Login</h1>
        <div className={styles['input-box']}>
          <input type="text" placeholder="Username" required/>
          <i className='bx bxs-user'></i>
        </div>
        <div className={styles['input-box']}>
          <input type="password" placeholder="Password" required/>
          <i className='bx bxs-lock-alt'></i>
        </div>
        <div className={styles['remember-forgot']}>
          <label><input type="checkbox"/>Remember Me</label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit" className={styles.btn}>Login</button>
        <div className={styles['register-link']}>
          <p>Don t have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
