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
  LinearProgress,
  Stack,
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
  const [userEnrollment,setUserEnrollment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState("0");
  const [progressPercentage, setProgressPercentage] = useState("0");
  console.log(userEnrollment, "userEnroll")

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
        .get(
          `http://localhost:8088/api/enrollments/users/${userId}/enrollments`,
          { headers }
        )
        .then((res) => {
          setUserEnrollment(res.data.find((e)=>e.courseId==id))
          setUserEnrollments(res.data.map((e) => e.courseId))
    })
        
        .catch((err) => console.error("Error fetching enrollments:", err));
    }
  }, [id, token, userId]);

  const handleEnroll = () => {
    if (course.courseType?.toLowerCase() === "paid") {
      navigate(`/course/${course.courseId}/purchase`);
      return;
    }

    axios
      .post(
        `http://localhost:8088/api/enrollments/courses/${id}/enrollments/${userId}`
      )
      .then(() => {
        setUserEnrollments((prev) => [...prev, course.courseId]);
        setDialogOpen(true);
      })
      .catch((err) => {
        console.error("Error enrolling:", err);
        alert(err.response?.data || "Enrollment failed");
      });
  };

  const handleMarkCompleted = () => navigate(`/course/${course.courseId}/certificate`);

  const handleLessonsCount = () => {
    const parsed = parseInt(completedLessons, 10);

    if (Number.isNaN(parsed) || parsed < 0) {
      alert("Please enter a valid non-negative number for completed lessons.");
      return;
    }

    axios
      .put(
        `http://localhost:8088/api/enrollments/courses/${course.courseId}/user/${userId}/updateProgress`,
        null,
        {
          params: { completedLessons },
        }
      )
      .then((res) => {
        setProgressPercentage(res.data.progressPercentage);
        console.log("Progress percentage:", res.data.progressPercentage);
      })
      .catch((err) => {
        console.error("Error updating progress");
        alert(
          err.response?.data || "Update enrollment completedLesson failed"
        );
      });
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!course) return <Typography>Course not found.</Typography>;

  const isPaidCourse = course.courseType?.toLowerCase() === "paid";
  const enrollButtonText = userEnrollments.includes(course.courseId)
    ? "Enrolled"
    : isPaidCourse
    ? `Enroll for ₹${course.price || "499"}`
    : "Enroll";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        p: 3,
      }}
    >
      {/* ✅ Top bar with only 'Courses' button on right */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 3,
        }}
      >
       
      </Box>

      {/* ✅ Main Course Details Card */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Card
          sx={{
            maxWidth: 800,
            width: "100%",
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            p: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 1, color: "#1E3A8A" }}
            >
              {course.topic}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Instructor: <strong>{course.instructor}</strong>
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {course.description}
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              Difficulty Level: <strong>{course.difficultyLevel}</strong>
            </Typography>

            {/* ---------- Buttons and Progress Section ---------- */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleEnroll}
                disabled={userEnrollments.includes(course.courseId)}
              >
                {enrollButtonText}
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  label="Lessons Completed"
                  placeholder="0"
                  value={completedLessons}
                  onChange={(e) => setCompletedLessons(e.target.value)}
                  inputProps={{
                    maxLength: 2,
                    style: { textAlign: "center", width: "50px" },
                  }}
                  size="small"
                  variant="outlined"
                />
                <Tooltip title="Update Progress">
                  <IconButton color="secondary" onClick={handleLessonsCount}>
                    <UpdateIcon />
                  </IconButton>
                </Tooltip>
              </Box>

             {userEnrollment!=null?  <Button
                variant="outlined"
                color="secondary"
                onClick={handleMarkCompleted}
              >
                Mark as Completed
              </Button>:
              // userEnrollment.status=="COMPLETED"?  <Button
              //   variant="contained"
              //   color="secondary"
              //   onClick={handleMarkCompleted}
              // >
              //    Download Certificate
              // </Button>:
              <></>
              }
              <Box sx={{ width: "100%", mt: 0.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.2,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {progressPercentage}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: (theme) => theme.palette.grey[300],
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                      transition: "width 0.4s ease",
                    },
                  }}
                />
              </Box>
            </Box>
          </CardContent>

          <Box sx={{ height: "1px", backgroundColor: "#ddd", my: 2 }} />

          <CardContent>
            
            <CourseLessonsSection courseId={id} isEnrolled={userEnrollments.includes(course.courseId)}/>
          </CardContent>
        </Card>
      </Box>

      {/* ---------- Enrollment Dialog ---------- */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          🎉 Enrollment Successful!
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            You’ve successfully enrolled in this course. Would you like to stay
            here or explore more courses?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(false)}
          >
            Stay on Page
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
