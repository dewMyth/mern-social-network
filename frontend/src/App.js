import React, { useContext, useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext, AuthContextProvider } from "./context/AuthContext";

import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Profile from "./Components/Pages/Profile/Profile";
import Register from "./Components/Pages/Register/Register";

function App() {
  const { user } = useContext(AuthContext) || localStorage.getItem("user");

  useEffect(() => {
    console.log("App.js: user = ", user);
  }, []);
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              exact
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              exact
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route exact path="/profile/:username" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
