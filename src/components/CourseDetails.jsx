import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CourseLessonsSection from "./CourseLessonsSection";
import "./CourseDetails.css";

export default function CourseDetails() {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState("0");

  useEffect(() => {
    setLoading(true);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(`http://localhost:8088/api/courses/${id}`, { headers })
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course details:", err))
      .finally(() => setLoading(false));

    if (userId) {
      axios
        .get(`http://localhost:8088/api/enrollments/users/${userId}/enrollments`, { headers })
        .then((res) => setUserEnrollments(res.data.map((e) => e.courseId)))
        .catch((err) => console.error("Error fetching enrollments:", err));
    }
  }, [id, token, userId]);

  const handleEnroll = () => {
    axios
      .post(`http://localhost:8088/api/enrollments/courses/${id}/enrollments/${userId}`)
      .then(() => {
        setUserEnrollments((prev) => [...prev, course.courseId]);
        setDialogOpen(true);
      })
      .catch((err) => {
        console.error("Error enrolling:", err);
        alert(err.response?.data || "Enrollment failed");
      });
  };

  const handleMarkCompleted = () => alert("Course marked as completed!");
  const handleLessonsCount = () => alert("Updating Progress at backend");

  if (loading)
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );

  if (!course) return <Typography>Course not found.</Typography>;

  // 👇 This is the return that should exist INSIDE the function
  return (
    <div className="course-details-container">
      <Card className="course-details-card">
        <CardContent className="course-header">
          <Typography variant="h4" className="course-title">
            {course.topic}
          </Typography>

          <Typography variant="subtitle1" className="course-instructor">
            Instructor: {course.instructor}
          </Typography>

          <Typography variant="body1" className="course-description">
            {course.description}
          </Typography>

          <Typography variant="body2" className="course-difficulty">
            Difficulty Level: {course.difficultyLevel}
          </Typography>

          <Box className="course-actions">
            <Button
              variant="contained"
              color="primary"
              onClick={handleEnroll}
              disabled={userEnrollments.includes(course.courseId)}
            >
              {userEnrollments.includes(course.courseId) ? "Enrolled" : "Enroll"}
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                label="Lessons Completed"
                value={completedLessons}
                onChange={(e) => setCompletedLessons(e.target.value)}
                size="small"
                variant="outlined"
                inputProps={{ style: { width: "70px", textAlign: "center" } }}
              />
              <Tooltip title="Update Progress">
                <IconButton color="secondary" onClick={handleLessonsCount}>
                  <UpdateIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleMarkCompleted}
            >
              Mark as Completed
            </Button>
          </Box>
        </CardContent>

        <Box sx={{ height: "1px", backgroundColor: "#ddd", margin: "16px 0" }} />

        <CardContent className="lessons-section">
          <Typography variant="h5" className="lessons-title">
            Course Lessons
          </Typography>
          <CourseLessonsSection courseId={id} />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          🎉 Enrollment Successful!
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            You’ve successfully enrolled in this course. Would you like to start
            learning now or explore more courses?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setDialogOpen(false)}>
            Stay on Page
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/courses")}>
            Explore Courses
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
