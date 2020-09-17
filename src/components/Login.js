import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <img
        src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png"
        alt=""
      />
      <div className="login__container">
        <form onSubmit={handleLogin}>
          <h4>Email</h4>
          <input type="email" />
          <h4>Password</h4>
          <input type="password" />
          <button className="login__submit">Login</button>
        </form>
      </div>
      <Link className="login__register" to="/register">
        don't have account ?
      </Link>
    </div>
  );
}

export default Login;
