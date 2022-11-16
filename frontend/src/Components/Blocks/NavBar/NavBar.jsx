import React, { useContext } from "react";
import { Person, Search, Chat, Notifications } from "@material-ui/icons";
import "./NavBar.css";
import { AuthContext } from "../../../context/AuthContext";

import { Link } from "react-router-dom";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">
            <Link className="link" to="/">
              The Social App
            </Link>
          </span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Search..."
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Home</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "avatar.svg"
              }
              alt=""
              className="topbarProfilePicture"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
