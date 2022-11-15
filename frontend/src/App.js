import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Profile from "./Components/Pages/Profile/Profile";
import Register from "./Components/Pages/Register/Register";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </>
  );
}

export default App;
