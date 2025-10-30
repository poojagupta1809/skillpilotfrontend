import {
  AccountBox,
  Article,
  Group,
  Height,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({mode,setMode}) => {
  const navigate=useNavigate();
  const handleCreate=()=>{
    navigate('/course/add')
  }
  const handleEnrollment=()=>{
    navigate('/courses/admin-enrollments')
  }
  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };

   const handleCert=()=>{
    navigate('/courses/certificate')
  }
  return (
    // <Grid xs={6} > 
    <Box  p={4}    sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // ensures left alignment
    pl:- 1,  
    display: { xs: "none", sm: "block" , width:"120px"}                  // small padding to adjust position
  }}
  height={'100%'} >
    {/* sx={{ display: { xs: "none", sm: "block" , width:"100px"}}}   */}
    
    
        <List sx={{alignContent:'flex-start',alignContent:'flex-start'}}>
          <ListItem disablePadding >
            <ListItemButton  onClick={handleCreate}   href="/course/add">
              <ListItemIcon>
               <AddCircleOutlineIcon/>
              </ListItemIcon>
              {/* <ListItemText primary="Create New Course" /> */}
              <Typography >Create New Course</Typography>
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding  >
            <ListItemButton  onClick={handleEnrollment} href="/courses/admin-enrollments">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Manage Enrollments" />
            </ListItemButton>
          </ListItem>
            <ListItem disablePadding   >
            <ListItemButton  onClick={handleDashboard} href="/admin/dashboard"> 
              <ListItemIcon>
                 <AnalyticsIcon/>
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem> */}
        </List>
     
    </Box>
    // </Grid>
  );
};

export default Sidebar;