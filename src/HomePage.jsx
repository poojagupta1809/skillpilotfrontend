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
import LessonList from "./components/LessonList";
import LessonPage from './components/LessonPage';
import AddLesson from './components/AddLesson';
import UpdateLesson from './components/UpdateLesson';
import CourseLessonsSection from './components/CourseLessonsSection';
import CourseItem from './components/CourseItem';
import MyEnrollments from './components/MyEnrollments';
import AdminEnrollments from './components/AdminEnrollments';
import CourseEdit from './components/CourseEdit';


function HomePage() {
  return (
    <Router>
      <NavBar />
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/About" element={<AboutContent />} />
          <Route path="/course/add" element={<Protected Role={'ADMIN'} to="/course/add" Component={CourseForm} ></Protected>} ></Route>
          <Route path='/admin' element={<Protected Role={'ADMIN'} to="/admin" Component={AdminDefaultPage} ></Protected>} />
          <Route path="/courses" element={<ExploreCourses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/lessonlist" element={<LessonList />} />
          <Route path="/lessonsection" element={<CourseLessonsSection />} />
        
          <Route path="/courses/lesson/updatelesson" element={<UpdateLesson />} />

          <Route path="/courses/:courseId" element={<CourseLessonsSection />} />
          <Route path="/courses/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/courses/myenrollments" element={<MyEnrollments />} />
          <Route path='/admin/course-details/:courseId' element={<Protected Role={'ADMIN'} to="/admin/course-details/:courseId" Component={CourseItem} ></Protected>} />
          <Route path='/admin/course/edit/:courseId' element={<Protected Role={'ADMIN'} to="/admin/course/edit/:courseId" Component={CourseEdit} ></Protected>} />
          <Route path="/courses/admin-enrollments" element={<AdminEnrollments/>} />
           <Route path="/courses/:courseId/add-lesson" element={<AddLesson />} />



        </Routes>
      </Container>


    </Router>


  );
}

export default HomePage;
