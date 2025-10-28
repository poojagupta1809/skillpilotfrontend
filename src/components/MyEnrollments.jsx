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
} from "@mui/material";

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
      setCourses(courseResponses.map((res) => res.data));
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
    <Box sx={{ py: 4, px: 2, bgcolor: "#F0F4FF", minHeight: "100vh" }}>
      {/* Hero Bar */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          mb: 4,
          background: "linear-gradient(120deg, #e0f2ff 0%, #ffffff 100%)",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Pacifico",
            color: "#1E3A8A",
            mb: 1,
          }}
        >
          My Enrolled Courses
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
          Continue your learning journey 🚀
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: "center" }}>
        <Button
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#3B82F6",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { bgcolor: "#1E3A8A" },
            px: 3,
          }}
          variant="contained"
        >
          Home
        </Button>
        <Button
          onClick={() => navigate("/courses")}
          sx={{
            bgcolor: "#3B82F6",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { bgcolor: "#1E3A8A" },
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
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1E3A8A", mb: 1 }}>
                {course.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                {course.description}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Instructor: {course.instructor || "Unknown"}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
                {course.difficultyLevel}
              </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: "#3B82F6", "&:hover": { bgcolor: "#1E3A8A" } }}
                  onClick={() => navigate(`/course/${course.courseId}`)}
                >
                  Continue Learning
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => handleUnenroll(course.courseId)}
                >
                  Unenroll
                </Button>
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
