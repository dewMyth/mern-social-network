import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Online from "../Online/Onlne";
import "./RightBar.css";

import axios from "axios";
import baseUrl from "../../../baseURL";

import { AuthContext } from "../../../context/AuthContext";

const RightBar = ({ user }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);

  const [followed, setFollowed] = useState(
    currentUser.following?.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          baseUrl + "user/followings/" + user?._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();

    // Get followed or not status
    if (currentUser.following?.includes(user?._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [currentUser.following, user?._id]);

  const handleAddOrRemove = async (e) => {
    e.preventDefault();
    try {
      if (followed) {
        console.log("unfollowing...");
        await axios
          .put(baseUrl + "user/" + user._id + "/unfollow", {
            userId: currentUser._id,
          })
          .then((res) => {
            console.log(res.data);
            dispatch({
              type: "UNFOLLOW",
              payload: user._id,
            });
          });
        setFollowed(false);
      } else {
        console.log("following...");
        await axios
          .put(baseUrl + "user/" + user._id + "/follow", {
            userId: currentUser._id,
          })
          .then((res) => {
            console.log(res.data);
            dispatch({
              type: "FOLLOW",
              payload: user._id,
            });
            sendFollowNotificationToUser();
          });
        setFollowed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendFollowNotificationToUser = async () => {
    try {
      await axios.post(baseUrl + "notification/create", {
        senderId: currentUser._id,
        receiverId: user._id,
        typeOfNotification: "following",
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        {user.username !== currentUser.username ? (
          <button className="rightbarFollowButton" onClick={handleAddOrRemove}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        ) : null}
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
          {/* <div className="rightbarFollowing">
            <img
              src="/assets/person/2.png"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Dewmith Akalanka</span>
          </div> */}

          {friends?.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? public_folder + friend.profilePicture
                      : public_folder + "avatar.svg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
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
