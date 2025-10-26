import { useState } from "react";
import React from "react";
import './App.css'
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import { Box, Container } from "@mui/material";
import Layout from "./Layout";
import DefaultContent from "./components/DefaultContent";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Protected from "./Protected";
import AdminDefaultPage from "./components/AdminDefaultPage";
import CourseForm from "./components/CourseForm";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";

function App() {
   
  return (
    <>

{/* 
    <Box
      sx={{
        width: "100vw",
        height: "100vh",  // full viewport height
        overflow: "hidden", // optional: hide scrollbars
      }}
    >
      <HomePage />
    </Box> */}

     <BrowserRouter>
     
     <Routes>
     
      <Route  exact path="/" element={ <HomePage/>}></Route>
      <Route  exact path="/signin" element={ <SignIn/>}></Route>
      <Route  exact path="/signup" element={ <Signup/>}></Route>
      <Route path="/course/add" element={<Protected Role={'ADMIN'} to="/course/add" Component={CourseForm} ></Protected>} ></Route>
      <Route path='/admin' element={<Protected Role={'ADMIN'} to="/admin" Component={AdminDefaultPage} ></Protected>}/>
       </Routes>
      </BrowserRouter>
       
    </>
  )
}

export default App
