import React, { useContext } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext, AuthContextProvider } from "./context/AuthContext";

import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Profile from "./Components/Pages/Profile/Profile";
import Register from "./Components/Pages/Register/Register";
import Messenger from "./Components/Pages/Messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={user !== null ? <Home /> : <Navigate to="login" />}
            />

            <Route
              exact
              path="/login"
              element={user !== null ? <Navigate to="/" /> : <Login />}
            />
            <Route
              exact
              path="/register"
              element={user !== null ? <Navigate to="/" /> : <Register />}
            />
            <Route
              exact
              path="/profile/:username"
              element={user == null ? <Navigate to="/login" /> : <Profile />}
            />
            <Route
              exact
              path="/messenger"
              element={user == null ? <Navigate to="/login" /> : <Messenger />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
