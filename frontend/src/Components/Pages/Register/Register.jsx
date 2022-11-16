import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../../../baseURL";

import "./Register.css";

import Alert from "@mui/material/Alert";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      passwordRef.current.setCustomValidity("Passwords don't match!");
      console.log("Passwords don't match!");
    } else {
      console.log("Passwords match!");
      const registerCredentials = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      console.log(registerCredentials);
      await axios
        .post(baseUrl + "auth/register", registerCredentials)
        .then((response) => {
          console.log(response);
          setError(false);
          setSuccess(true);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  };

  return (
    <>
      <div className="register">
        <div className="registerWrapper">
          <div className="registerLeft">
            <h3 className="registerLogo">The Social App</h3>
            <span className="registerDesc">
              Connect with friends and the world around you with the social app.
            </span>
          </div>
          <div className="registerRight">
            <form className="registerBox" onSubmit={handleRegister}>
              <input
                placeholder="Email"
                type="email"
                className="registerInput"
                ref={emailRef}
                required
              />
              <input
                placeholder="Username"
                type="text"
                className="registerInput"
                ref={usernameRef}
                required
              />
              <input
                placeholder="Password"
                type="password"
                className="registerInput"
                ref={passwordRef}
                required
              />
              <input
                placeholder="Confirm Password"
                type="password"
                className="registerInput"
                ref={confirmPasswordRef}
                required
              />
              {
                // If the user is successfully registered, display a success message
                success ? (
                  <Alert severity="success">User created Successfully!</Alert>
                ) : null
              }
              {
                // If the user is successfully registered, display a success message
                error ? (
                  <Alert severity="warning">
                    Check entered passwords and email!
                  </Alert>
                ) : null
              }
              <button className="registerButton">Sign Up</button>
              <button className="registerLoginButton">
                Create a new account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
