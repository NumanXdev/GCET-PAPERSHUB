import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setLogggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState({ id: "", user: "" });
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log(cookies.token);
    console.log(cookies);
    if (cookies.token) {
      try {
        const decodedToken = jwtDecode(cookies.token);
        console.log(decodedToken);
        setLogggedIn(true);
        setUserData({ id: decodedToken.id, user: decodedToken.user });
      } catch (err) {
        console.error("Invalid token", err);
      }
    } else {
      setLogggedIn(false);
      setUserData({ id: "", user: "" });
    }
  }, [cookies.token]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logout = () => {
    removeCookie("token");
    setLogggedIn(false);
    setUserData({ id: "", user: "" });
    navigate("/home");
    handleClose();
  };

  const login = () => navigate("/login");
  const togglerDrawer = () => setIsOpen(!isOpen);
  const AvatarName = userData.user
    ? userData.user.slice(0, 1).toUpperCase()
    : "U";

  return (
    <div className="Navbar d-flex justify-content-between align-items-center">
      {/* Hamburger Menu */}
      <button
        className="p-3 hamburger ms-2"
        onClick={togglerDrawer}
        aria-label="Toggle Drawer"
      >
        <img
          src="/Assets/More.svg"
          alt="Hamburger Menu"
          className="img-fluid"
          style={{ width: "3rem", cursor: "pointer" }}
        />
      </button>
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <button onClick={togglerDrawer} className="close-btn">
          ✕
        </button>
        <ul>
          <Link
            to="/Home"
            onClick={() => setIsOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li>Home</li>
          </Link>
          <Link
            to="/Content"
            onClick={() => setIsOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li>Content</li>
          </Link>
          <Link
            to="/Contributors"
            onClick={() => setIsOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li>Contributors</li>
          </Link>
        </ul>
        <Link
          to="/About"
          onClick={() => setIsOpen(false)}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h2 className="text-center link-underline-dark aboutus">About us</h2>
        </Link>
      </div>

      {/* Avatar + Logout */}
      <div className="d-flex justify-content-center align-items-center">
        {userData.id === import.meta.env.VITE_APP_ID && (
          <Link to="/upload">
            <button className="btn btn-success btn-sm">Upload here</button>
          </Link>
        )}
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Your Account">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  color: "white",
                  backgroundColor: "#6f6e96",
                  fontSize: "15px",
                }}
              >
                {AvatarName}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {isLoggedIn && (
            <MenuItem>
              <Avatar />
              &nbsp;<span className="fw-semibold">{userData.user}</span>
            </MenuItem>
          )}
          {!isLoggedIn && (
            <>
              <Divider />
              <MenuItem onClick={login}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            </>
          )}
          {isLoggedIn && (
            <>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </>
          )}
        </Menu>
        <button
          className="p-3 me-2"
          style={{ border: "none" }}
          aria-label="View Updates"
        >
          <Tooltip title="View Updates">
            <Link to="/updates">
              <img
                src="/Assets/bell-outline.svg"
                alt="Notification"
                className="img-fluid"
                style={{ width: "4rem" }}
              />
            </Link>
          </Tooltip>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
