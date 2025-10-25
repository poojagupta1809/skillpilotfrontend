import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

import { Link, useLocation } from "react-router-dom";

function NavBar() {

  const location = useLocation();
  const currentPath = location.pathname;

  let navLinks = [];

  if (currentPath === "/") {
    navLinks = [
      { path: "/signin", label: "SignIn" },
      { path: "/signup", label: "SignUp" },
      { path: "/About", label: "About" },
    ];
  } else if (currentPath === "/signin") {
    navLinks = [
        { path: "/", label: "Back to Home" },
        { path: "/signup", label: "SignUp" },
    
    ];
  }  else if (currentPath === "/signup") {
    navLinks = [
        { path: "/", label: "Back to Home" },
   
    ];
  } else {
    navLinks = [{ path: "/", label: "Home" }];
  }

  return (
     <AppBar position="static" color="primary">
      <Toolbar>
         <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: 40, width: 40 }}
            />
          </IconButton>
          
        
        </Box>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Skill Pilot
        </Typography>

        {/* Right side - Dynamic Links */}
        <Box>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}



export default NavBar;