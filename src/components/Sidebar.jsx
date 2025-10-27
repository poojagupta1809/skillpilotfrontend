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
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({mode,setMode}) => {
  const navigate=useNavigate();
  const handleCreate=()=>{
    navigate('/course/add')
  }
  return (
    // <Grid xs={6} > 
    <Box  p={4} sx={{ display: { xs: "none", sm: "block" }}} height={'100%'} >
    
    
        <List>
          <ListItem disablePadding>
            <ListItemButton  onClick={handleCreate}   href="/course/add">
              <ListItemIcon>
               <AddCircleOutlineIcon/>
              </ListItemIcon>
              <ListItemText primary="Creat New Course" />
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
          <ListItem disablePadding>
            <ListItemButton  href="#simple-list">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Manage Enrollments" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
        </List>
     
    </Box>
    // </Grid>
  );
};

export default Sidebar;