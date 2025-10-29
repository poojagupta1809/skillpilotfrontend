import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  
  let leftLinks = [];
  let rightLinks = [];

  if (!token) {
   
    leftLinks = [
      { path: "/", label: "Home" },
      { path: "/About", label: "About" },
    ];

    rightLinks = [
      { path: "/signin", label: "SignIn" },
      { path: "/signup", label: "SignUp" },
    ];
  } else {
   
   leftLinks = [
  {
    path: role === "ADMIN" ? "/admin" : "/courses",
    label: role === "ADMIN" ? "Course Catalog" : "Explore Courses"
  },
      ...(role === "ADMIN"
        ? [{ path: "/courses/admin-enrollments", label: "Manage Enrollments" }]
        : [{ path: "/courses/myenrollments", label: "My Learning" }]
      )
    ];

    rightLinks = []; 
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar disableGutters sx={{ px: 2 }}>
       
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img src="/logo.png" alt="Logo" style={{ height: 50, width: 50 }} />
          </IconButton>

          {leftLinks.map(link => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "1.1rem",
                ml: 1,
                px: 1.5,
                borderRadius: 1,
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

       
        <Box display="flex" alignItems="center">
          {rightLinks.map(link => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "1.1rem",
                ml: 1,
                px: 1.5,
                borderRadius: 1,
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                },
              }}
            >
              {link.label}
            </Button>
          ))}

          {token && (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "1.1rem",
                ml: 1,
                px: 1.5,
                borderRadius: 1,
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                },
              }}
            >
              Sign Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
