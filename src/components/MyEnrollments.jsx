import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const MyEnrollments = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

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

  useEffect(() => {
    if (userId) fetchEnrollments(userId);
  }, [userId]);

  const fetchEnrollments = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8088/api/enrollments/users/${id}/enrollments`
      );
      setEnrollments(response.data);

      const coursePromises = response.data.map((e) =>
        axios.get(`http://localhost:8088/api/courses/${e.courseId}`)
      );
      const courseResponses = await Promise.all(coursePromises);

      // Combine course data with enrollment progress
      const combinedData = courseResponses.map((res, index) => ({
        ...res.data,
        progress: response.data[index].progress || 0, // <-- assumes progress field exists in enrollment
      }));

      setCourses(combinedData);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setErrorMsg("Failed to fetch your enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:8088/api/enrollments/courses/${courseId}/enrollments/${userId}`
      );
      setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
      setCourses((prev) => prev.filter((c) => c.courseId !== courseId));
    } catch (error) {
      console.error("Error unenrolling:", error);
      setErrorMsg(
        error.response?.data?.message || "Failed to unenroll from the course."
      );
    }
  };

  return (
    <Box sx={{ py: 4, px: 2, bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      {/* Hero Bar */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          mb: 4,
          background: "linear-gradient(120deg, #E0F2FE 0%, #ffffff 100%)",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Pacifico",
            color: "#2563EB",
            mb: 1,
          }}
        >
          My Learning
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
          Continue your learning journey 🌤️
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: "center" }}>
        
        <Button
          onClick={() => navigate("/courses")}
          sx={{
            bgcolor: "#93C5FD",
            color: "#1E3A8A",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "20px",
            "&:hover": { bgcolor: "#BFDBFE" },
            px: 3,
          }}
          variant="contained"
        >
          Explore Courses
        </Button>
      </Stack>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {/* No Enrollments */}
      {!loading && enrollments.length === 0 && (
        <Alert severity="info" sx={{ mt: 3, fontSize: "1.1rem" }}>
          You haven’t enrolled in any courses yet.
        </Alert>
      )}

      {/* Courses List */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          mt: 2,
        }}
      >
        {courses.map((course) => (
          <Card
            key={course.courseId}
            sx={{
              width: 320,
              borderRadius: 4,
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              },
              background: "linear-gradient(180deg, #ffffff 0%, #F9FAFB 100%)",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#1E3A8A",
                  mb: 1,
                  fontFamily: "Poppins",
                }}
              >
                {course.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5, color: "#4B5563" }}>
                {course.description}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: "#6B7280" }}>
                Instructor: {course.instructor || "Unknown"}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: "#2563EB",
                  letterSpacing: "0.5px",
                  mb: 1,
                }}
              >
                {course.difficultyLevel}
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5, fontWeight: "medium" }}
                >
                  Progress: {Math.round(course.progress || 0)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={course.progress || 0}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    bgcolor: "#E5E7EB",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#3B82F6",
                    },
                  }}
                />
              </Box>
            </CardContent>

            {/* Buttons Section */}
            <Box sx={{ p: 2, pt: 0 }}>
              <Stack direction="row" spacing={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PlayCircleFilledWhiteRoundedIcon />}
                  onClick={() => navigate(`/course/${course.courseId}`)}
                  sx={{
                    background: "#93C5FD",
                    color: "#1E3A8A",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "25px",
                    py: 1,
                    fontSize: "0.95rem",
                    boxShadow: "0 3px 6px rgba(147,197,253,0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#BFDBFE",
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 10px rgba(147,197,253,0.5)",
                    },
                  }}
                >
                  Continue
                </Button>

                <Tooltip title="Unenroll" arrow>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleUnenroll(course.courseId)}
                    sx={{
                      minWidth: "48px",
                      borderRadius: "50%",
                      borderColor: "#FCA5A5",
                      color: "#B91C1C",
                      borderWidth: "2px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#FEF2F2",
                        borderColor: "#DC2626",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 10px rgba(239,68,68,0.15)",
                      },
                    }}
                  >
                    <DeleteOutlineRoundedIcon />
                  </Button>
                </Tooltip>
              </Stack>
            </Box>
          </Card>
        ))}
      </Box>

      {errorMsg && (
        <Alert severity="error" sx={{ mt: 3, fontSize: "1.1rem" }}>
          {errorMsg}
        </Alert>
      )}
    </Box>
  );
};

export default MyEnrollments;
