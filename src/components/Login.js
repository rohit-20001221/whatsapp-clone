import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  // eslint-disable-next-line
  const [{ user, token }, dispatch] = useStateValue();
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("unauthorized");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: "USER",
          user: data.user,
          token: data.token,
        });
        history.replace("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="login">
      <img
        src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png"
        alt=""
      />
      <p className="login__error">{err}</p>
      <div className="login__container">
        <form onSubmit={handleLogin}>
          <h4>Email</h4>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <h4>Password</h4>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button type="submit" className="login__submit">
            Login
          </button>
        </form>
      </div>
      <Link className="login__register" to="/register">
        don't have account ?
      </Link>
    </div>
  );
}

export default Login;
