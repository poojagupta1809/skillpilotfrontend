import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";
import CourseLessonsSection from "./CourseLessonsSection";
import "./CourseDetails.css";

export default function CourseDetails() {
  let authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
   
    setLoading(true);

    const token = sessionStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(`http://localhost:8088/api/courses/${id}`, { headers })
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = () => {
  axios
    .post(
      `http://localhost:8088/api/enrollments/courses/${id}/enrollments/${userId}`
    )
    .then((res) => {
      alert("You have successfully enrolled in this course!");
      setEnrolled(true);
    })
    .catch((err) => {
      console.error("Error enrolling:", err);
      if (err.response && err.response.data) {
        alert(`Enrollment failed: ${err.response.data}`);
      } 
    });
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
            <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={(e) => handleEnroll(e, course.courseId)}
                  disabled={userEnrollments.includes(course.courseId)}
                >
                  {userEnrollments.includes(course.courseId)
                    ? "Enrolled"
                    : "Enroll"}
                </Button>
          </div>
        </CardContent>
      </Card>

      <CourseLessonsSection courseId={id} />
    </div>
  );
}
