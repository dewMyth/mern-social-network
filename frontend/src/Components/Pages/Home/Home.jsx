import React from "react";
import NavBar from "../../Blocks/NavBar/NavBar";
import LeftBar from "../../Blocks/LeftBar/LeftBar";
import RightBar from "../../Blocks/RightBar/RightBar";
import Feed from "../../Blocks/Feed/Feed";

import "./Home.css";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="homeContainer">
        <LeftBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
