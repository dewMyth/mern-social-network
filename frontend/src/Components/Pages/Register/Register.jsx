import React from "react";
import "./Register.css";

const Register = () => {
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
            <div className="registerBox">
              <input placeholder="Email" className="registerInput" />
              <input
                placeholder="Username"
                type="text"
                className="registerInput"
              />
              <input
                placeholder="Password"
                type="password"
                className="registerInput"
              />
              <input
                placeholder="Confirm Password"
                type="password"
                className="registerInput"
              />
              <button className="registerButton">Sign Up</button>
              <button className="registerLoginButton">
                Create a new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
