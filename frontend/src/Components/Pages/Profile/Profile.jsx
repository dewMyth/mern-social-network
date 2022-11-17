import React, { useState, useEffect } from "react";

import "./Profile.css";

import NavBar from "../../Blocks/NavBar/NavBar";
import Feed from "../../Blocks/Feed/Feed";
import LeftBar from "../../Blocks/LeftBar/LeftBar";
import RightBar from "../../Blocks/RightBar/RightBar";
import axios from "axios";

import { useParams } from "react-router";

const Profile = () => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});

  const params = useParams();
  // const username = username;

  useEffect(() => {
    axios.get("/user/?username=" + params.username).then((res) => {
      setUser(res.data);
    });
  });

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
                src={
                  user.profilePicture
                    ? public_folder + user.profilePicture
                    : public_folder + "avatar.svg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
