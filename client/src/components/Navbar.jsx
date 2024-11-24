import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Badge,
  Box,
  Button,
} from "@mui/material";
import { Search, ShoppingCart, AccountCircle, Menu as MenuIcon } from "@mui/icons-material";

const Navbar = ({ cartCount }) => {
  const [token, setToken] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
    Swal.fire({
      text: "Logged you out. Visit Again",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "darkslategray" }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
          <img src="/assets/icon.png" alt="Logo" style={{ height: "40px", marginRight: "8px" }} />
          MyShop
        </Typography>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, mx: 2, display: "flex", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 1 }}>
          <Search sx={{ color: "gray", ml: 1 }} />
          <InputBase
            placeholder="Search Items"
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>

        {/* Browse Menu */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/">Home</MenuItem>
          <MenuItem component={Link} to="/products">Products</MenuItem>
          <MenuItem component={Link} to="/categories">Categories</MenuItem>
        </Menu>

        {/* Account Menu */}
        <IconButton color="inherit" onClick={handleAccountMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={accountMenuAnchor}
          open={Boolean(accountMenuAnchor)}
          onClose={handleAccountMenuClose}
        >
          {token ? (
            <>
              <MenuItem component={Link} to="/wishlist">Wishlist</MenuItem>
              <MenuItem component={Link} to="/admin">Admin</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/signin">Log In</MenuItem>
              <MenuItem component={Link} to="/signup">Sign Up</MenuItem>
            </>
          )}
        </Menu>

        {/* Cart */}
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
