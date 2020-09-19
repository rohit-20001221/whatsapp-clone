import React, { useRef, useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
// import axios from "../axios";
import url from "../server";

function Register() {
  const profilePicRef = useRef(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const history = useHistory();

  const handleRegister = (event) => {
    event.preventDefault();
    console.log([email, name, password]);
    const fd = new FormData();
    fd.append("email", email);
    fd.append("name", name);
    fd.append("password", password);
    fd.append("profile_pic", profilePicRef.current.files[0]);

    // const headers = new Headers();
    // headers.append("Content-Type", "multipart/form-data");

    fetch(`${url}/users/signup`, {
      method: "POST",
      body: fd,
      // headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to create user try another mail");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        history.replace("/login");
      })
      .catch((err_) => {
        console.log(err_);
        setError(err_.message);
      });
  };

  // const consoleLogFiles = () => {
  //   console.log(profilePicRef.current.files[0]);
  // };

  return (
    <div className="register">
      <h3>𝕽𝖊𝖌𝖎𝖘𝖙𝖊𝖗 𝖋𝖔𝖗 𝖜𝖍𝖆𝖙𝖘𝖆𝖕𝖕</h3>
      <p className="register__error">{err}</p>
      <div className="register__container">
        <form onSubmit={handleRegister}>
          <h3>Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <h3>Name</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <h3>Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
          <h3>Image</h3>
          <input ref={profilePicRef} type="file" />
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
