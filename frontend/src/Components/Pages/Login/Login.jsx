import React, { useState, useRef, useContext } from "react";
import "./Login.css";
import baseUrl from "../../../baseURL";
import { AuthContext } from "../../../context/AuthContext";

import CircularProgress from "@mui/material/CircularProgress";

import Alert from "@mui/material/Alert";

import axios from "axios";

import { useNavigate } from "react-router";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // Instead of useState, we can use use useRef, useRef => doesn't trigger re-rendering onChange function
  const emailRef = useRef();
  const passwordRef = useRef();

  const { isFetching, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch({ type: "LOGIN_START" });
    await axios
      .post(baseUrl + "auth/login", loginCredentials)
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        window.location.reload();
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", payload: "Wrong Credentials!" });
      });
  };

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">The Social App</h3>
            <span className="loginDesc">
              Connect with friends and the world around you with the social app.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleLogin}>
              <input
                placeholder="Email"
                type="email"
                className="loginInput"
                // onChange={(e) => setEmail(e.target.value)}
                required
                ref={emailRef}
              />
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
                // onChange={(e) => setPassword(e.target.value)}
                required
                ref={passwordRef}
              />
              {error ? <Alert severity="error">{error}</Alert> : null}
              <button className="loginButton">
                {isFetching ? (
                  <CircularProgress color="primary" size="15px" />
                ) : (
                  "Login"
                )}
              </button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
                Create a new account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
