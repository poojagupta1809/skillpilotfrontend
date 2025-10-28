import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicSuggestions, setTopicSuggestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    setNoResults(false);
    try {
      const res = await axios.get("http://localhost:8088/api/courses/view");
      setCourses(res.data);
      setFilteredCourses(res.data);
      setShowFilters(true);

      const topics = [...new Set(res.data.map((c) => c.topic))];
      setTopicSuggestions(topics.filter(Boolean));

      if (!res.data.length) setNoResults(true);
    } catch (err) {
      console.error(err);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's enrollments
  const fetchEnrollments = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8088/api/enrollments/users/${userId}/enrollments`);
      setEnrolledCourseIds(res.data.map((e) => e.courseId));
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  // Enroll in course
  const handleEnroll = async (courseId) => {
    if (!userId) return;
    try {
      await axios.post(`http://localhost:8088/api/enrollments/courses/${courseId}/enrollments/${userId}`);
      setEnrolledCourseIds((prev) => [...prev, courseId]);

      setSnackbar({
        open: true,
        message: "You have successfully enrolled in this course!",
        severity: "success",
      });

      setTimeout(() => {
        const proceed = window.confirm("Do you want to go to the course details?");
        if (proceed) navigate(`/course/${courseId}`);
      }, 500);
    } catch (err) {
      console.error("Error enrolling:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Enrollment failed. Please try again.",
        severity: "error",
      });
    }
  };

  // Live filtering
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          (c.title?.toLowerCase().includes(term) || false) ||
          (c.topic?.toLowerCase().includes(term) || false)
      );
    }

    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter((c) =>
        selectedDifficulty.includes(c.difficultyLevel)
      );
    }

    setFilteredCourses(filtered);
    setNoResults(filtered.length === 0);
  }, [searchTerm, selectedDifficulty, courses]);

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const handleSearchChange = (event, value) => setSearchTerm(value);

  const handleDifficultyChange = (level) => {
    setSelectedDifficulty((prev) =>
      prev.includes(level) ? prev.filter((v) => v !== level) : [...prev, level]
    );
  };

  return (
    <Box sx={{ py: 4, px: 2, bgcolor: "#F0F4FF", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          Explore Courses
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#3B82F6", "&:hover": { bgcolor: "#1E3A8A" } }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#3B82F6", "&:hover": { bgcolor: "#1E3A8A" } }}
            onClick={() => navigate("/courses/myenrollments")}
          >
            My Courses
          </Button>
        </Stack>
      </Box>

      {/* Search */}
      <Autocomplete
        freeSolo
        options={topicSuggestions}
        inputValue={searchTerm}
        onInputChange={handleSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by topic or title..."
            variant="outlined"
            sx={{ width: "100%", mb: 3, borderRadius: 2 }}
          />
        )}
      />

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Filters */}
        {showFilters && (
          <Paper sx={{ p: 2, minWidth: 200 }}>
            <Typography variant="h6" gutterBottom>
              Difficulty
            </Typography>
            <FormGroup>
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <FormControlLabel
                  key={level}
                  control={
                    <Checkbox
                      checked={selectedDifficulty.includes(level)}
                      onChange={() => handleDifficultyChange(level)}
                    />
                  }
                  label={level}
                />
              ))}
            </FormGroup>
          </Paper>
        )}

        {/* Courses */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, flex: 1 }}>
          {loading ? (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : noResults ? (
            <Alert severity="info" sx={{ width: "100%" }}>
              No courses found for “{searchTerm}”.
            </Alert>
          ) : (
            filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.courseId);
              return (
                <Card
                  key={course.courseId}
                  sx={{
                    width: 300,
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  }}
                  onDoubleClick={() => navigate(`/course/${course.courseId}`)}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
                      {course.title || "Untitled Course"}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      {course.description || "No description available"}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      Instructor: {course.instructorName || course.instructor || "Unknown"}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                      {course.difficultyLevel || "N/A"}
                    </Typography>
                    <Button
                      fullWidth
                      variant={isEnrolled ? "contained" : "outlined"}
                      color={isEnrolled ? "success" : "primary"}
                      disabled={isEnrolled}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent double-click
                        handleEnroll(course.courseId);
                      }}
                    >
                      {isEnrolled ? "Enrolled" : "Enroll"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExploreCourses;
