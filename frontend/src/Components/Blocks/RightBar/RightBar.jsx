import React, { useState } from "react";
import Online from "../Online/Onlne";
import "./RightBar.css";

import { Link } from "react-router-dom";

const RightBar = ({ user }) => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  // const [friends, setFriends] = useState(user.followings);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src={public_folder + "gift.png"}
            alt=""
          />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={public_folder + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <Online />
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {/* {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )} */}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 0
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">{user.username}'s friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/person/2.png"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Dewmith Akalanka</span>
          </div>

          {/* {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? public_folder + friend.profilePicture
                      : public_folder + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))} */}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    </>
  );
};

export default RightBar;
