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

function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState({});
  const navigate = useNavigate();

  // Get token from session (for admin authentication)
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [navigate]);

  // Fetch all enrollments
  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      // Fetch all enrollments
      const response = await axios.get("http://localhost:8088/api/enrollments");
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

  const handleDeleteEnrollment = async (courseId, userId) => {
    try {
      await axios.delete(
        `http://localhost:8088/api/enrollments/courses/${courseId}/enrollments/${userId}`
      );
      setEnrollments((prev) =>
        prev.filter((e) => e.courseId !== courseId || e.userId !== userId)
      );
    } catch (error) {
      console.error("Error deleting enrollment:", error);
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

  // Group enrollments by courseId
  const groupedEnrollments = enrollments.reduce((acc, enrollment) => {
    if (!acc[enrollment.courseId]) {
      acc[enrollment.courseId] = [];
    }
    acc[enrollment.courseId].push(enrollment);
    return acc;
  }, {});

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
          Admin - All Enrollments
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85 }}>
          Manage enrollments across courses 🚀
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ px: 4 }}>
        {Object.keys(groupedEnrollments).length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mx: "auto", mt: 10 }}
          >
            No enrollments available.
          </Typography>
        ) : (
          Object.keys(groupedEnrollments).map((courseId) => {
            const course = courses[courseId];
            if (!course) return null;

            return (
              <Grid item xs={12} sm={6} md={4} key={courseId}>
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
                     
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                     
                    </Typography>
                  
                  </CardContent>

                  <CardActions sx={{ flexDirection: "column", px: 2, pb: 2 }}>
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
                      
                    >
                     Enrollments
                    </Button>

                    {/* Display all users enrolled in this course */}
                    {groupedEnrollments[courseId].map((enrollment) => (
                      <Box
                        key={enrollment.enrollmentId}
                        sx={{ display: "flex", alignItems: "center", mt: 2 }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 2 }}
                        >
                          User ID: {enrollment.userId}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDeleteEnrollment(courseId, enrollment.userId)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
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

export default AdminEnrollments;
