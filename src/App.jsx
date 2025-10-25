import { useState } from "react";
import React from "react";
import Layout from "./Layout";
import DefaultContent from "./components/DefaultContent";
import Signup from "./components/Signup";
import './App.css'
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import { Box, Container } from "@mui/material";



function App() {
   
  return (
    <>


    <Box
      sx={{
        width: "100vw",
        height: "100vh",  // full viewport height
        overflow: "hidden", // optional: hide scrollbars
      }}
    >
      <HomePage />
    </Box>

    </>
  )
}

export default App
