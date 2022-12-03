import React, { useState, useContext, useEffect, useRef } from "react";
import { Person, Search, Chat, Notifications } from "@material-ui/icons";
import "./NavBar.css";
import { AuthContext } from "../../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Notification from "../Notifications/Notification";

import axios from "axios";
import baseUrl from "../../../baseURL";
import GlobalState from "../../../GlobalState";

const NavBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const socket = GlobalState.socket;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    window.location.reload();
  };

  const handleProfileClick = () => {
    navigate("/profile/" + user.username);
  };

  const [notifications, setNotifications] = useState([]);
  const [arrivalNotification, setArrivalNotification] = useState(null);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.get(
          baseUrl + "notification/get-notifications/" + user._id
        );

        setNotifications(
          res.data.slice(-10).sort((notification1, notification2) => {
            return (
              new Date(notification2.createdAt) -
              new Date(notification1.createdAt)
            );
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getNotifications();
    console.log(notifications);
  }, []);

  // Receive notification from socket server
  useEffect(() => {
    socket.on("getNotification", (notification) => {
      setArrivalNotification({
        senderId: notification.senderId,
        typeOfNotification: notification.typeOfNotification,
        post: notification.post,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Push the arrival notification to the user's notification array
  useEffect(() => {
    arrivalNotification &&
      setNotifications((prev) => [...prev, arrivalNotification]);
  }, [arrivalNotification]);

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
              <Link className="link" to="/messenger">
                <Chat />
              </Link>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Notifications
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Dashboard
                    </Notifications>
                    <Menu {...bindMenu(popupState)}>
                      {notifications?.length !== 0
                        ? notifications.map((notification) => (
                            <MenuItem
                              onClick={popupState.close}
                              key={notification._id}
                            >
                              <Notification
                                notification={notification}
                                user={user}
                              />
                            </MenuItem>
                          ))
                        : "No notifications"}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
              <span className="topbarIconBadge">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            </div>
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: -1 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user?.profilePicture
                      ? PF + user.profilePicture
                      : PF + "avatar.svg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfileClick}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </div>
    </>
  );
};

export default NavBar;
