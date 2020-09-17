import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  const handleRegister = (event) => {
    event.preventDefault();
  };

  return (
    <div className="register">
      <h3>𝕽𝖊𝖌𝖎𝖘𝖙𝖊𝖗 𝖋𝖔𝖗 𝖜𝖍𝖆𝖙𝖘𝖆𝖕𝖕</h3>
      <div className="register__container">
        <form onSubmit={handleRegister}>
          <h3>Email</h3>
          <input type="email" />
          <h3>Name</h3>
          <input type="text" />
          <h3>Password</h3>
          <input type="password" />
          <h3>Image</h3>
          <input type="file" />
          <button type="submit">Register</button>
        </form>
      </div>
      <Link className="register__login" to="/login">
        have an account ?
      </Link>
    </div>
  );
}

export default Register;
