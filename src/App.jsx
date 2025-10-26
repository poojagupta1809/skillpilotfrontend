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
