import { useState } from "react";
import React from "react";
import './App.css'
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import { Box, Container } from "@mui/material";

function App() {
   
  return (
    <>

 
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        p: 0,
        m: 0,
      }}
    >
      <HomePage />
    </Box> 

   
       
    </>
  )
}

export default App
