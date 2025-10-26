import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";
import CourseLessonsSection from "./CourseLessonsSection";
import "./CourseDetails.css"; // <-- import CSS

export default function CourseDetails() {
  let authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8088/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = () => {
    console.log("Enrolling in course:", id);
    navigate("/my-enrollments");
  };

  if (loading)
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );

  if (!course) return <Typography>Course not found.</Typography>;

  return (
    <div className="course-details-container">
      <Card className="course-card">
        <CardContent className="course-card-content">
          <div className="course-main-content">
            <Typography variant="h4" className="course-title">
              {course.topic}
            </Typography>

            <Typography variant="h6" className="course-instructor">
              Instructor: {course.instructor}
            </Typography>

            <Typography variant="body1" className="course-description">
              {course.description}
            </Typography>

            <Typography variant="body2" className="course-difficulty">
              Difficulty Level: {course.difficultyLevel}
            </Typography>
          </div>

          <div className="enroll-button-container">
            <Button variant="contained" color="primary" onClick={handleEnroll}>
              Enroll
            </Button>
          </div>
        </CardContent>
      </Card>

      <CourseLessonsSection courseId={id} />
    </div>
  );
}
