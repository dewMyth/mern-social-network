import React, { useState, useEffect } from "react";

import "./Profile.css";

import NavBar from "../../Blocks/NavBar/NavBar";
import Feed from "../../Blocks/Feed/Feed";
import LeftBar from "../../Blocks/LeftBar/LeftBar";
import RightBar from "../../Blocks/RightBar/RightBar";
import axios from "axios";

const Profile = () => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/user/?username=johnp");
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <div className="profile">
        <LeftBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user?.coverPicture || public_folder + "default-cover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={public_folder + "person/2.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username="johnp" />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
