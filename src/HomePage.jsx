import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeContent from './components/HomeContent';

import SignIn from './components/SignIn';
import Signup from './components/Signup';
import NavBar from './Navbar';
import AboutContent from './AboutContent';
import Protected from "./Protected";
import AdminDefaultPage from './components/AdminDefaultPage';
import CourseForm from './components/CourseForm';
import ExploreCourses from './components/ExploreCourses';
import CourseDetails from './components/CourseDetails';


function HomePage() {
  return (
    <Router>
    <NavBar/>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/About" element={<AboutContent />} />
          <Route path="/course/add" element={<Protected Role={'ADMIN'} to="/course/add" Component={CourseForm} ></Protected>} ></Route>
          <Route path='/admin' element={<Protected Role={'ADMIN'} to="/admin" Component={AdminDefaultPage} ></Protected>}/>
          <Route path="/courses" element={<ExploreCourses />} />
          <Route path="/course/:id" element={<CourseDetails />} />

        </Routes>
      </Container>

    </Router>

   
  );
}

export default HomePage;