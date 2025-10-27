import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState({});
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Get userId and token from session
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    if (!storedUserId || !token) {
      navigate("/login");
      return;
    }

    setUserId(Number(storedUserId));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [navigate]);

  // Fetch enrollments once we have userId
  useEffect(() => {
    if (userId) fetchEnrollments(userId);
  }, [userId]);

  const fetchEnrollments = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8088/api/enrollments/users/${id}/enrollments`
      );
      setEnrollments(response.data);

      // Fetch course details for each enrollment
      const coursePromises = response.data.map((e) =>
        axios.get(`http://localhost:8088/api/courses/${e.courseId}`)
      );
      const courseResponses = await Promise.all(coursePromises);

      const courseMap = {};
      courseResponses.forEach((res) => {
        courseMap[res.data.courseId] = res.data;
      });
      setCourses(courseMap);
    } catch (error) {
      console.error("Error fetching enrollments or courses:", error);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:8088/api/enrollments/courses/${courseId}/enrollments/${userId}`
      );
      setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  // Map difficulty to color
  const difficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Header */}
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)",
          color: "white",
          textAlign: "center",
          py: 5,
          mb: 5,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          boxShadow: "0px 4px 20px rgba(30, 58, 138, 0.4)",
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
          My Enrolled Courses
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85 }}>
          Keep learning and exploring your passion 🚀
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ px: 4 }}>
        {enrollments.length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mx: "auto", mt: 10 }}
          >
            You have not enrolled in any courses yet.
          </Typography>
        ) : (
          enrollments.map((enrollment) => {
            const course = courses[enrollment.courseId];
            if (!course) return null;

            return (
              <Grid item xs={12} sm={6} md={4} key={enrollment.enrollmentId}>
                <Card
                  sx={{
                    minHeight: "250px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: 5,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.03)", boxShadow: 10 },
                  }}
                >
                  {/* Optional course image */}
                  {course.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.image}
                      alt={course.topic}
                    />
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {course.topic}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Instructor: {course.instructor}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {course.description.length > 80
                        ? course.description.slice(0, 80) + "..."
                        : course.description}
                    </Typography>
                    <Chip
                      label={course.difficultyLevel}
                      color={difficultyColor(course.difficultyLevel)}
                      size="small"
                    />
                  </CardContent>

                  <CardActions
                    sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        background:
                          "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)",
                        color: "white",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #3B82F6 0%, #1E3A8A 100%)",
                        },
                      }}
                      onClick={() =>
                        navigate(`/course/${course.courseId}`)
                      }
                    >
                      Start
                    </Button>

                    <IconButton
                      color="error"
                      onClick={() => handleUnenroll(course.courseId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
}

export default MyEnrollments;