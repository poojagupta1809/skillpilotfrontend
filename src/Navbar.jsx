import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom'; 
import LogoutIcon from '@mui/icons-material/Logout'; 

import { Link, useLocation } from "react-router-dom";

function NavBar() {

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  let navLinks = [];
    
  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/signin'); 
    sessionStorage.clear()
    console.log('Navigation called.');
    
  };


  if (currentPath === "/") {
    if(sessionStorage.getItem("token")===null){
      navLinks = [
        { path: "/signin", label: "SignIn" },
        { path: "/signup", label: "SignUp" },
        { path: "/About", label: "About" },
      ];
      }else if(sessionStorage.getItem("role")==="ADMIN")
      {
          navLinks = [
          { path: "/admin", label: "Courses" },
          { path: "/About", label: "About" },
        ];
      }
      else if(sessionStorage.getItem("role")==="LEARNER")
      {
          navLinks = [
          { path: "/courses", label: "Courses" },
          { path: "/About", label: "About" },
        ];
      }
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
     navLinks = [
          { path: "/", label: "Home" },
          { path: "/About", label: "About" },
        ];
    
  }

  return (
     <AppBar position="static" color="primary">
      <Toolbar>
         <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: 50, width: 50 }}
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

           {sessionStorage.getItem("token")!=null && ( // Conditionally render logout button
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <LogoutIcon />

          </IconButton>
        )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}



export default NavBar;