import React from "react";
import "./Login.css";

// import { CheckBox } from "@material-ui/icons";

const Login = () => {
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
            <div className="loginBox">
              <input placeholder="Email" className="loginInput" />
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
              />
              <button className="loginButton">Login</button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
                Create a new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
